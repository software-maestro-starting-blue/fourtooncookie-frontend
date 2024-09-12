import { KeyboardAvoidingView, Platform, SafeAreaView, View } from "react-native";
import { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Header from "./Header/Header";
import TextInputLayout from "./TextInputLayout/TextInputLayout";

import { RootStackParamList } from "../../constants/routing";

import * as S from "./DiaryWritePage.styled";
import { GlobalErrorInfoType } from "../../types/error";
import { LocalDate } from "@js-joda/core";

import { RuntimeError } from "../../error/RuntimeError";
import Button from "../../components/common/Button/Button";
import { OS } from "../../types/os";
import handleError from "../../error/errorhandler";
import { ApiError } from "../../error/ApiError";
import { API_STATUS } from "../../constants/api";
import { useSelectedCharacterStore } from "../../store/selectedCharacter";
import { useDiaryListStore } from "../../store/diaryList";
import { Diary } from "../../types/diary";


export type DiaryWritePageProp = NativeStackScreenProps<RootStackParamList, 'DiaryWritePage'>;

const DiaryWritePage = ({ navigation, route }: DiaryWritePageProp) => {
    const { currentDiaryId, ...rest } = route.params;

    const { getDiaryById } = useDiaryListStore();

    const currentDiary: Diary | undefined = currentDiaryId ? getDiaryById(currentDiaryId) : undefined
    
    const [diaryDate, setDiaryDate] = useState<LocalDate>(currentDiary ? currentDiary.diaryDate : LocalDate.now());
    const [content, setContent] = useState<string>(currentDiary ? currentDiary.content : "");
    const [isWorking, setIsWorking] = useState<boolean>(false);

    const { selectedCharacter } = useSelectedCharacterStore();

    const { postDiary, updateDiary } = useDiaryListStore();

    const isNextButtonEnabled: boolean = content.length > 0;
    
    useEffect(() => {
        if (! selectedCharacter) {
            handleError(
                new RuntimeError("캐릭터가 선택되지 않았습니다."),
                GlobalErrorInfoType.ALERT,
                () => {
                    navigation.navigate('CharacterSelectPage');
                }
            );
        }
    }, [selectedCharacter]);

    if (! selectedCharacter) {
        return null;
    }

    const handleDiaryDateChange = (newDate: LocalDate) => {
        setDiaryDate(newDate);
    }

    const handleWriteDoneButtonPress = async () => {
        if (isWorking) return;

        setIsWorking(true);

        const diary: Diary = currentDiary ? currentDiary : {
            diaryId: -1,
            content: content,
            isFavorite: false,
            diaryDate: diaryDate,
            paintingImageUrls: [],
            characterId: selectedCharacter.id
        }

        try {
            if (! currentDiaryId) {
                await postDiary(diary);
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
                    error,
                    GlobalErrorInfoType.ALERT
                );
            }
        } finally {
            setIsWorking(false);
        }
    }

    const handleInputTextChange = (text: string) => {
        if (isWorking) return;

        setContent(text);
    }


    return (
        <SafeAreaView style={S.styles.safeArea}>
            <View style={S.styles.container}>
                <Header 
                    date={diaryDate} 
                    isDateChangeable={! currentDiaryId}
                    onDateChange={handleDiaryDateChange}
                />
                <TextInputLayout
                    text={content}
                    onTextChange={handleInputTextChange}
                /> 
                <View style={S.styles.separator} />
                <KeyboardAvoidingView 
                    style={S.styles.bottomContainer} 
                    enabled={true}
                    keyboardVerticalOffset={80}
                    behavior={(Platform.OS == OS.IOS) ? 'padding' : 'height'}
                >
                    <Button
                        title="다음"
                        onPress={handleWriteDoneButtonPress}
                        style={{
                            ...S.styles.nextButton, 
                            backgroundColor: isNextButtonEnabled ? '#FFC426' : '#DDDDDD'
                        }}
                        textStyle={S.styles.nextButtonText}
                    />
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    );
}

export default DiaryWritePage;