import { SafeAreaView, View } from "react-native";
import { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Header from "./Header/Header";
import TextInputLayout from "./TextInputLayout/TextInputLayout";

import { RootStackParamList } from "../../constants/routing";

import * as S from "./DiaryWritePage.styled";
import { GlobalErrorInfoType } from "../../types/error";
import { LocalDate } from "@js-joda/core";

import { RuntimeError } from "../../error/RuntimeError";
import handleError from "../../error/errorhandler";
import { useSelectedCharacterStore } from "../../hooks/store/selectedCharacter";
import WriteDoneButtonLayout from "./WriteDoneButtonLayout/WriteDoneButtonLayout";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useDiaryById } from "../../hooks/server/diary";


export type DiaryWritePageProp = NativeStackScreenProps<RootStackParamList, 'DiaryWritePage'>;

const DiaryWritePage = ({ route }: DiaryWritePageProp) => {
    const { currentDiaryId, ...rest } = route.params || { currentDiaryId : undefined };

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { data: currentDiary } = useDiaryById(currentDiaryId);
    const { selectedCharacter } = useSelectedCharacterStore();
    
    const [diaryDate, setDiaryDate] = useState<LocalDate>(currentDiary ? currentDiary.diaryDate : LocalDate.now());
    const [content, setContent] = useState<string>(currentDiary ? currentDiary.content : "");
    
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

    const handleDiaryDateChange = (newDate: LocalDate) => {
        setDiaryDate(newDate);
    }

    const handleInputTextChange = (text: string) => {
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
                <WriteDoneButtonLayout
                    diaryDate={diaryDate}
                    content={content}
                    currentDiaryId={currentDiaryId}
                />
            </View>
        </SafeAreaView>
    );
}

export default DiaryWritePage;