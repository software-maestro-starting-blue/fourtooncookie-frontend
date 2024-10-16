import { SafeAreaView, View } from "react-native";
import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Header from "./Header/Header";
import TextInputLayout from "./TextInputLayout/TextInputLayout";

import { RootStackParamList } from "../../types/routing";

import * as S from "./DiaryWritePage.styled";
import { LocalDate } from "@js-joda/core";

import WriteDoneButtonLayout from "./WriteDoneButtonLayout/WriteDoneButtonLayout";
import { useDiaryById } from "../../hooks/server/diary";
import { useFunctionWithErrorHandling } from "../../hooks/error";


export type DiaryWritePageProp = NativeStackScreenProps<RootStackParamList, 'DiaryWritePage'>;

const DiaryWritePage = ({ route }: DiaryWritePageProp) => {
    const { currentDiaryId, ...rest } = route.params || { currentDiaryId : undefined };

    const { data: currentDiary } = useDiaryById(currentDiaryId);
    
    const [diaryDate, setDiaryDate] = useState<LocalDate>(currentDiary ? currentDiary.diaryDate : LocalDate.now());
    const [content, setContent] = useState<string>(currentDiary ? currentDiary.content : "");

    const { functionWithErrorHandling } = useFunctionWithErrorHandling();

    const handleDiaryDateChange = functionWithErrorHandling((newDate: LocalDate) => {
        setDiaryDate(newDate);
    })

    const handleInputTextChange = functionWithErrorHandling((text: string) => {
        setContent(text);
    })

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