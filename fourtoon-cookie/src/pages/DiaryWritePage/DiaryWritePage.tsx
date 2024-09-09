import { KeyboardAvoidingView, Platform, SafeAreaView, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Header from "./Header/Header";
import TextInputLayout from "./TextInputLayout/TextInputLayout";

import { postDiary, putDiary } from "../../apis/diary";
import { RootStackParamList } from "../../constants/routing";

import * as S from "./DiaryWritePage.styled";
import GlobalSelectionCharacterStateContext from "../../components/global/GlobalSelectionCharacter/GlobalSelectionCharacterStateContext";
import { GlobalErrorInfoType } from "../../types/error";
import { LocalDate } from "@js-joda/core";

import { RuntimeError } from "../../error/RuntimeError";
import Button from "../../components/common/Button/Button";
import { OS } from "../../types/os";
import handleError from "../../error/errorhandler";
import { ApiError } from "../../error/ApiError";
import { API_STATUS } from "../../constants/api";


export type DiaryWritePageProp = NativeStackScreenProps<RootStackParamList, 'DiaryWritePage'>;

const DiaryWritePage = ({ navigation, route }: DiaryWritePageProp) => {
    const { diary, isEdit, ...rest } = route.params || { diary: undefined, isEdit: false };

    
    const [diaryDate, setDiaryDate] = useState<LocalDate>(diary ? diary.diaryDate : LocalDate.now());
    const [content, setContent] = useState<string>(diary ? diary.content : "");
    const [isWorking, setIsWorking] = useState<boolean>(false);

    const { selectedCharacter, setSelectedCharacter } = useContext(GlobalSelectionCharacterStateContext);

    const isNextButtonEnabled: boolean = content.length > 0;
    
    useEffect(() => {
        if (isEdit && ! diary) {
            handleError(
                new RuntimeError("잘못된 형식입니다."),
                GlobalErrorInfoType.ALERT,
                () => {
                    navigation.navigate('DiaryTimelinePage');
                }
            );
        }
        if (! selectedCharacter) {
            handleError(
                new RuntimeError("캐릭터가 선택되지 않았습니다."),
                GlobalErrorInfoType.ALERT,
                () => {
                    navigation.navigate('CharacterSelectPage');
                }
            );
        }
    }, [isEdit, diary, selectedCharacter]);


    if (isEdit && ! diary){
        return null;
    }

    if (! selectedCharacter) {
        return null;
    }

    const handleDiaryDateChange = (newDate: LocalDate) => {
        setDiaryDate(newDate);
    }

    const handleCharacterChooseButtonPress = () => {
        if (isWorking) return;

        navigation.navigate('CharacterSelectPage');
    }

    const handleWriteDoneButtonPress = async () => {
        if (isWorking) return;

        setIsWorking(true);

        try {
            if (! isEdit) {
                await postDiary(selectedCharacter?.id, diaryDate, content);
            } else if (diary) {
                await putDiary(selectedCharacter?.id, diary.diaryId, content);
            } else {
                handleError(
                    new RuntimeError("잘못된 형식입니다."),
                    GlobalErrorInfoType.ALERT
                );
                return;
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
                    isDateChangeable={! isEdit}
                    onDateChange={handleDiaryDateChange}
                    onCharacterChoosePress={handleCharacterChooseButtonPress}
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