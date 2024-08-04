import { SafeAreaView } from "react-native";
import { useContext, useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Header from "./Header/Header";
import TextInputLayout from "./TextInputLayout/TextInputLayout";
import HashtagLayout from "./HashtagLayout/HashtagLayout";

import { postDiary, patchDiary } from "../../apis/diary";
import { RootStackParamList } from "../../constants/routing";

import * as S from "./DiaryWritePage.styled";
import GlobalSelectionCharacterStateContext from "../../components/global/GlobalSelectionCharacter/GlobalSelectionCharacterStateContext";
import GlobalJwtTokenStateContext from "../../components/global/GlobalJwtToken/GlobalJwtTokenStateContext";
import GlobalErrorInfoStateContext from "../../components/global/GlobalError/GlobalErrorInfoStateContext";
import { GlobalErrorInfoType } from "../../types/error";
import { LocalDate } from "@js-joda/core";


export type DiaryWritePageProp = NativeStackScreenProps<RootStackParamList, 'DiaryWritePage'>;

const DiaryWritePage = ({ navigation, route }: DiaryWritePageProp) => {
    const { diary, isEdit, ...rest } = route.params || { diary: undefined, isEdit: false };

    
    const [diaryDate, setDiaryDate] = useState<LocalDate>(diary ? diary.diaryDate : LocalDate.now());
    const [content, setContent] = useState<string>(diary ? diary.content : "");
    const [hashtags, setHashtags] = useState<number[]>(diary ? diary.hashtagIds : []); // TODO: Hashtag type 구현 필요
    const [weather, setWeather] = useState<number | null>(null); // TODO: Weather type 구현 필요
    const [isWorking, setIsWorking] = useState<boolean>(false);

    const { selectedCharacter, setSelectedCharacter } = useContext(GlobalSelectionCharacterStateContext);
    const jwtContext = useContext(GlobalJwtTokenStateContext);
    const { errorInfo, setErrorInfo } = useContext(GlobalErrorInfoStateContext);

    const hashtagsContainWeather: number[] = (weather) ? [weather, ...hashtags] : hashtags
    
    useEffect(() => {
        if (isEdit && ! diary) {
            setErrorInfo({
                type: GlobalErrorInfoType.MODAL,
                message: "잘못된 형식입니다.",
                callback: () => navigation.navigate('DiaryTimelinePage')
            });
        }
        if (! selectedCharacter) {
            setErrorInfo({
                type: GlobalErrorInfoType.MODAL,
                message: "캐릭터를 선택해주세요.",
                callback: () => navigation.navigate('CharacterSelectPage')
            });
        }
    }, [isEdit, diary, navigation]);


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
                await postDiary(selectedCharacter?.id, diaryDate, content, hashtagsContainWeather, jwtContext);
            } else if (diary) {
                await patchDiary(selectedCharacter?.id, diary.diaryId, content, hashtagsContainWeather, jwtContext);
            } else {
                setErrorInfo({
                    type: GlobalErrorInfoType.MODAL,
                    message: "잘못된 형식입니다.",
                    callback: () => navigation.navigate('DiaryTimelinePage')
                });
                return;
            }

            navigation.navigate('DiaryTimelinePage');
        } catch (error) {
            console.error("Error", error);
            setErrorInfo({
                type: GlobalErrorInfoType.MODAL,
                message: "일기 작성 중 오류가 발생하였습니다."
            });
        } finally {
            setIsWorking(false);
        }
    }

    const handleInputTextChange = (text: string) => {
        if (isWorking) return;

        setContent(text);
    }


    return (
        <SafeAreaView style={S.styles.container}>
            <Header 
                date={diaryDate} 
                isDateChangeable={! isEdit}
                onDateChange={handleDiaryDateChange}
                onCharacterChoosePress={handleCharacterChooseButtonPress}
                onDonePress={handleWriteDoneButtonPress} 
                />
            <TextInputLayout
                text={content}
                onTextChange={handleInputTextChange}
            /> 
            <HashtagLayout 
                hashtagIds={hashtagsContainWeather}
            />
        </SafeAreaView>
    );
}

export default DiaryWritePage;