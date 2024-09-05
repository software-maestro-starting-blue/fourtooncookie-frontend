import { KeyboardAvoidingView, Platform, SafeAreaView, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Header from "./Header/Header";
import TextInputLayout from "./TextInputLayout/TextInputLayout";

import { postDiary, patchDiary } from "../../apis/diary";
import { RootStackParamList } from "../../constants/routing";

import * as S from "./DiaryWritePage.styled";
import GlobalSelectionCharacterStateContext from "../../components/global/GlobalSelectionCharacter/GlobalSelectionCharacterStateContext";
import GlobalErrorInfoStateContext from "../../components/global/GlobalError/GlobalErrorInfoStateContext";
import { GlobalErrorInfoType } from "../../types/error";
import { LocalDate } from "@js-joda/core";

import { RuntimeError } from "../../error/RuntimeError";
import Button from "../../components/common/Button/Button";
import { OS } from "../../types/os";


export type DiaryWritePageProp = NativeStackScreenProps<RootStackParamList, 'DiaryWritePage'>;

const DiaryWritePage = ({ navigation, route }: DiaryWritePageProp) => {
    const { diary, isEdit, ...rest } = route.params || { diary: undefined, isEdit: false };

    
    const [diaryDate, setDiaryDate] = useState<LocalDate>(diary ? diary.diaryDate : LocalDate.now());
    const [content, setContent] = useState<string>(diary ? diary.content : "");
    const [isWorking, setIsWorking] = useState<boolean>(false);

    const { selectedCharacter, setSelectedCharacter } = useContext(GlobalSelectionCharacterStateContext);
    const { errorInfo, setErrorInfo } = useContext(GlobalErrorInfoStateContext);

    //TODO: 해시태그 관련 로직 구현

    const isNextButtonEnabled: boolean = content.length > 0;
    
    useEffect(() => {
        if (isEdit && ! diary) {
            setErrorInfo({
                type: GlobalErrorInfoType.MODAL,
                error: new RuntimeError("잘못된 형식입니다.")
            });
            navigation.navigate('DiaryTimelinePage');
        }
        if (! selectedCharacter) {
            setErrorInfo({
                type: GlobalErrorInfoType.MODAL,
                error: new RuntimeError("캐릭터가 선택되지 않았습니다.")
            });
            navigation.navigate('CharacterSelectPage');
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
                await postDiary(selectedCharacter?.id, diaryDate, content, []);
            } else if (diary) {
                await patchDiary(selectedCharacter?.id, diary.diaryId, content, []);
            } else {
                setErrorInfo({
                    type: GlobalErrorInfoType.MODAL,
                    error: new RuntimeError("잘못된 형식입니다.")
                });
                return;
            }

            navigation.navigate('DiaryTimelinePage');
        } catch (error) {
            if (error instanceof Error) {
                setErrorInfo({
                    type: GlobalErrorInfoType.MODAL,
                    error: error
                });
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