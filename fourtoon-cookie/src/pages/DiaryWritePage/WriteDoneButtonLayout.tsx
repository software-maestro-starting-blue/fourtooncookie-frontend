import { Alert, KeyboardAvoidingView, Platform, StyleSheet } from "react-native"
import { LocalDate } from "@js-joda/core";
import { useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { OS } from "../../types/os"
import { Diary, DiaryStatus } from "../../types/diary";
import { useSelectedCharacterStore } from "../../hooks/store/selectedCharacter";
import { RootStackParamList } from "../../types/routing";
import Button from "../../components/common/Button";

import { AccountStatus } from "../../types/account";
import { useCreateDiary, useUpdateDiary } from "../../hooks/server/diary";
import { useAccountState } from "../../hooks/account";
import buttonTrack from "../../system/amplitude";
import { useEffectWithErrorHandling, useFunctionWithErrorHandling } from "../../hooks/error";
import { useTranslationWithParentName } from "../../hooks/locale";
import { SelectedCharacterNotExistError } from "../../types/error/character/SelectedCharacterNotExistError";
import { showSuccessToast } from "../../system/toast";
import { useDiaryWritePageContext } from "./DiaryWritePageProvider";


const WriteDoneButtonLayout = () => {
    const { diaryDate, content, currentDiaryId } = useDiaryWritePageContext();

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const [isWorking, setIsWorking] = useState<boolean>(false);

    const { mutate: createDiary, isLoading: isCreateMutateLoading, isSuccess: isCreateMutationSuccess } = useCreateDiary();
    const { mutate: updateDiary, isLoading: isUpdateMutateLoading, isSuccess: isUpdateMutationSuccess } = useUpdateDiary();

    const { selectedCharacter } = useSelectedCharacterStore();

    const { accountState } = useAccountState();

    const { functionWithErrorHandling } = useFunctionWithErrorHandling();

    const t = useTranslationWithParentName('pages.diaryWritePage.writeDoneButtonLayout');
    const commonT = useTranslationWithParentName('common');
    const loginT = useTranslationWithParentName('login');

    const isMutateLoading: boolean = isCreateMutateLoading || isUpdateMutateLoading;
    const isMutateSuccess: boolean = isCreateMutationSuccess || isUpdateMutationSuccess;

    const isNextButtonEnabled = content.length > 0 && ! isWorking;

    useEffectWithErrorHandling(() => {
        if (isWorking) return;

        if (isMutateLoading) return;

        if (! isMutateSuccess) return;

        showSuccessToast(t('diaryCreated'));
        navigation.navigate('DiaryTimelinePage');
    }, [isWorking, isMutateLoading, isMutateSuccess]);

    const handleWriteDoneButtonPress = functionWithErrorHandling(() => {
        if (accountState !== AccountStatus.LOGINED) {
            Alert.alert(
                loginT('loginRequired'),
                loginT('loginRequiredDetail'),
                [
                    {
                        text: commonT('confirm'),
                        style: 'destructive'
                    }
                ]
            );
            navigation.navigate('IntroPage');
            return;
        }

        if (! selectedCharacter) {
            throw new SelectedCharacterNotExistError(t("pleaseSelectCharacter"));
        }

        if (isWorking) return;

        setIsWorking(true);

        const diary: Diary = {
            diaryId: currentDiaryId ? currentDiaryId : -1,
            content: content,
            isFavorite: false,
            diaryDate: diaryDate,
            paintingImageUrls: [],
            characterId: selectedCharacter.id,
            diaryStatus: DiaryStatus.IN_PROGRESS
        }

        if (! currentDiaryId) {
            createDiary(diary);
        } else {
            updateDiary(diary);
        }

        buttonTrack('캐릭터 ID: ' + diary.characterId + '로 생성')
        setIsWorking(false);
    });

    return (
        <KeyboardAvoidingView 
            style={styles.bottomContainer} 
            enabled={true}
            keyboardVerticalOffset={80}
            behavior={(Platform.OS == OS.IOS) ? 'padding' : 'height'}
        >
            <Button
                title={commonT('done')}
                onPress={handleWriteDoneButtonPress}
                style={{
                    ...styles.nextButton, 
                    backgroundColor: isNextButtonEnabled ? '#FFC426' : '#DDDDDD'
                }}
                textStyle={styles.nextButtonText}
            />
        </KeyboardAvoidingView>
    )
}

export default WriteDoneButtonLayout;

const styles = StyleSheet.create({
    bottomContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
      },
    nextButton: {
        width: '100%',
        height: 60,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
      },
      nextButtonText: {
        fontSize: 17,
        fontWeight: '600'
      }
});