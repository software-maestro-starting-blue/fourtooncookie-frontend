import { Alert } from "react-native"
import { useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Diary, DiaryStatus } from "../../types/diary";
import { useSelectedCharacterStore } from "../../hooks/store/selectedCharacter";
import { RootStackParamList } from "../../types/routing";

import { AccountStatus } from "../../types/account";
import { useCreateDiary, useUpdateDiary } from "../../hooks/server/diary";
import { useAccountState } from "../../hooks/account";
import buttonTrack from "../../system/amplitude";
import { useEffectWithErrorHandling, useFunctionWithErrorHandling } from "../../hooks/error";
import { useTranslationWithParentName } from "../../hooks/locale";
import { SelectedCharacterNotExistError } from "../../types/error/character/SelectedCharacterNotExistError";
import { showSuccessToast } from "../../system/toast";
import { useDiaryWritePageContext } from "./DiaryWritePageProvider";
import KeyboardAwareContainer from "../../components/common/KeyboardAwareContainer";
import YellowWideButton from "../../components/common/YellowWideButton";


const WriteDoneButtonLayout = () => {
    const { diaryDate, content, currentDiaryId } = useDiaryWritePageContext();

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const [isWorking, setIsWorking] = useState<boolean>(false);

    const { mutate: createDiary, isSuccess: isCreateMutationSuccess } = useCreateDiary();
    const { mutate: updateDiary, isSuccess: isUpdateMutationSuccess } = useUpdateDiary();

    const { selectedCharacter } = useSelectedCharacterStore();

    const { accountState } = useAccountState();

    const { functionWithErrorHandling } = useFunctionWithErrorHandling();

    const t = useTranslationWithParentName('pages.diaryWritePage.writeDoneButtonLayout');
    const commonT = useTranslationWithParentName('common');
    const loginT = useTranslationWithParentName('login');
    const isMutateSuccess: boolean = isCreateMutationSuccess || isUpdateMutationSuccess;

    const isNextButtonEnabled = content.length > 0 && ! isWorking;

    useEffectWithErrorHandling(() => {
        if (isWorking) return;

        if (! isMutateSuccess) return;

        showSuccessToast(t('diaryCreated'));
        navigation.navigate('DiaryTimelinePage');
    }, [isWorking, isMutateSuccess]);

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

        if (! isNextButtonEnabled) return;

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
        <KeyboardAwareContainer>
            <YellowWideButton
                isNextAvailabe={isNextButtonEnabled}
                onNextButtonClick={handleWriteDoneButtonPress}
            />
        </KeyboardAwareContainer>
    )
}

export default WriteDoneButtonLayout;