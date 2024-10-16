import { SafeAreaView, StyleSheet, View } from "react-native";
import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import TextInputLayout from "./TextInputLayout";

import { RootStackParamList } from "../../types/routing";

import { LocalDate } from "@js-joda/core";

import WriteDoneButtonLayout from "./WriteDoneButtonLayout";
import { useDiaryById } from "../../hooks/server/diary";
import { useFunctionWithErrorHandling } from "../../hooks/error";
import BackButton from "../../components/common/BackButton/BackButton";
import DateInfo from "./DateInfo";
import CharacterIconButton from "./CharacterIconButton";
import { NavigationProp, useNavigation } from "@react-navigation/native";


export type DiaryWritePageProp = NativeStackScreenProps<RootStackParamList, 'DiaryWritePage'>;

const DiaryWritePage = ({ route }: DiaryWritePageProp) => {
    const { currentDiaryId, ...rest } = route.params || { currentDiaryId : undefined };

    const { data: currentDiary } = useDiaryById(currentDiaryId);
    
    const [diaryDate, setDiaryDate] = useState<LocalDate>(currentDiary ? currentDiary.diaryDate : LocalDate.now());
    const [content, setContent] = useState<string>(currentDiary ? currentDiary.content : "");

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const { functionWithErrorHandling } = useFunctionWithErrorHandling();

    const handleCharacterChoosePress = functionWithErrorHandling(() => {
        navigation.navigate("CharacterSelectPage");
    });

    const handleDiaryDateChange = functionWithErrorHandling((newDate: LocalDate) => {
        setDiaryDate(newDate);
    })

    const handleInputTextChange = functionWithErrorHandling((text: string) => {
        setContent(text);
    })

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <BackButton style={styles.backButton} />
                    <DateInfo date={diaryDate} isChangeable={! currentDiaryId} onDateChange={handleDiaryDateChange} />
                    <CharacterIconButton onCharacterChoosePress={handleCharacterChoosePress} />
                </View>
                <TextInputLayout
                    text={content}
                    onTextChange={handleInputTextChange}
                />
                <View style={styles.separator} />
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

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        flex: 1,
        paddingLeft: 23,
        paddingRight: 23,
        position: 'relative'
      },
    separator: {
        width: "100%",
        height: 1,
        backgroundColor: '#E9ECEF',
        alignSelf: 'stretch',
        flexGrow: 0,
    },
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
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        width: '100%',
        height: 64,
      },
      backButton: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        position: 'relative'
      }
});