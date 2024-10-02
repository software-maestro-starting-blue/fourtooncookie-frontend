import { Alert, KeyboardAvoidingView, Platform } from "react-native"
import { LocalDate } from "@js-joda/core";
import { useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { OS } from "../../../types/os"
import { Diary, DiaryStatus } from "../../../types/diary";
import { useSelectedCharacterStore } from "../../../hooks/store/selectedCharacter";
import { RootStackParamList } from "../../../types/routing";
import Button from "../../../components/common/Button/Button";

import * as S from "./WriteDoneButtonLayout.styled";
import { AccountStatus } from "../../../types/account";
import { useCreateDiary, useUpdateDiary } from "../../../hooks/server/diary";
import { useAccountState } from "../../../hooks/account";
import buttonTrack from "../../../system/amplitude";
import { useFunctionWithErrorHandling } from "../../../hooks/error";

export interface WriteDoneButtonLayout {
    diaryDate: LocalDate;
    content: string;
    currentDiaryId?: number;
}

const WriteDoneButtonLayout = (props: WriteDoneButtonLayout) => {
    const { diaryDate, content, currentDiaryId, ...rest } = props;

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const [isWorking, setIsWorking] = useState<boolean>(false);

    const { mutate: createDiary } = useCreateDiary();
    const { mutate: updateDiary } = useUpdateDiary();
    const { selectedCharacter } = useSelectedCharacterStore();

    const { accountState } = useAccountState();

    const { functionWithErrorHandling } = useFunctionWithErrorHandling();

    const isNextButtonEnabled = content.length > 0 && ! isWorking;

    if (! selectedCharacter) return null;

    const handleWriteDoneButtonPress = functionWithErrorHandling(() => {
        if (accountState !== AccountStatus.LOGINED) {
            Alert.alert(
                '로그인 필요 기능',
                '로그인을 진행해야 일기 작성이 가능합니다.',
                [
                    {
                        text: '확인',
                        style: 'destructive'
                    }
                ]
            );
            navigation.navigate('IntroPage');
            return;
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

        navigation.navigate('DiaryTimelinePage');
    
        setIsWorking(false);
    });

    return (
        <KeyboardAvoidingView 
            style={S.styles.bottomContainer} 
            enabled={true}
            keyboardVerticalOffset={80}
            behavior={(Platform.OS == OS.IOS) ? 'padding' : 'height'}
        >
            <Button
                title="완료"
                onPress={handleWriteDoneButtonPress}
                style={{
                    ...S.styles.nextButton, 
                    backgroundColor: isNextButtonEnabled ? '#FFC426' : '#DDDDDD'
                }}
                textStyle={S.styles.nextButtonText}
            />
        </KeyboardAvoidingView>
    )
}

export default WriteDoneButtonLayout;