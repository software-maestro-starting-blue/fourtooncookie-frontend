import { Alert, KeyboardAvoidingView, Platform } from "react-native"
import { LocalDate } from "@js-joda/core";
import { useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { OS } from "../../../types/os"
import { Diary, DiaryStatus } from "../../../types/diary";
import { useSelectedCharacterStore } from "../../../store/selectedCharacter";
import { RootStackParamList } from "../../../constants/routing";
import { API_STATUS } from "../../../constants/api";
import { ApiError } from "../../../error/ApiError";
import handleError from "../../../error/errorhandler";
import { GlobalErrorInfoType } from "../../../types/error";
import Button from "../../../components/common/Button/Button";

import * as S from "./WriteDoneButtonLayout.styled";
import { AccountStatus } from "../../../types/account";
import { useCreateDiary, useUpdateDiary } from "../../../hooks/server/diary";
import { useAccountState } from "../../../hooks/account";

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

    const isNextButtonEnabled = content.length > 0 && ! isWorking;

    if (! selectedCharacter) return null;

    const handleWriteDoneButtonPress = async () => {
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

        try {
            if (! currentDiaryId) {
                await createDiary(diary);
            } else {
                await updateDiary(diary);
            }

            navigation.navigate('DiaryTimelinePage');
        } catch (error) {
            if (error instanceof ApiError && error.getStatus() === API_STATUS.CONFLICT) {
                error.message = "선택한 날짜에 이미 일기가 존재합니다. 다른 날을 선택해주세요.";
            }

            if (error instanceof Error) {
                handleError(
                    error
                );
            }
        } finally {
            setIsWorking(false);
        }
    }

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