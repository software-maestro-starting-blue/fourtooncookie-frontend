import { SafeAreaView, Text, View } from "react-native";
import Header from "../../components/diarywrite/Header/Header";
import TextInputLayer from "../../components/diarywrite/TextInputLayer/TextInputLayer";
import HashtagLayer from "../../components/diarywrite/HashtagLayer/HashtagLayer";
import { useEffect, useRef, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import * as S from "./DiaryWritePage.styled";
import { getGpsPosition } from "../../systemcall/gpt";
import { Position } from "../../types/gps";
import { getWeather } from "../../apis/weather";
import { getHashtags } from "../../apis/hashtag";
import { postDiary, patchDiary } from "../../apis/diary";
import { RootStackParamList } from "../../constants/routing";

// 컴포넌트 인자 관리
export type DiaryWritePageProp = NativeStackScreenProps<RootStackParamList, 'DiaryWritePage'>;


const DiaryWritePage = ({ navigation, route }: DiaryWritePageProp) => {
    const { date, originDiaryId, isEdit } = route.params;

    // 상태 관리
    const hashtagIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const isWeatherUpdated = useRef<boolean>(false);
    const [diaryDate, setDiaryDate] = useState<Date>(date);
    const [content, setContent] = useState<string>("");
    const [hashtags, setHashtags] = useState<number[]>([]); // TODO: Hashtag type 구현 필요
    const [weather, setWeather] = useState<number | null>(null); // TODO: Weather type 구현 필요
    const [isWorking, setIsWorking] = useState<boolean>(false);
    
    
    // 이펙트 관리
    useEffect(() => {
        if (isWeatherUpdated.current) return;

        const fetchWeatherData = async () => {
            try {
                const gpsPos: Position = await getGpsPosition();
                const newWeather: number = await getWeather(diaryDate, gpsPos);
                setWeather(newWeather);
                console.log("날씨 업데이트");
            } catch (error) {
                console.error(error);
            } finally {
                isWeatherUpdated.current = true;
            }
        }

        fetchWeatherData();

    }, [diaryDate, isWeatherUpdated]);

    useEffect(() => {
        const fetchHashtags = async () => {
            const newHashtags = await getHashtags(content);
            // TODO: hashtag들을 정렬하기
            setHashtags(newHashtags);
            console.log("해시태그 업데이트");
        }

        hashtagIntervalRef.current = setInterval(fetchHashtags, 3000);

        return () => {
            if (hashtagIntervalRef.current)
                clearInterval(hashtagIntervalRef.current);
        }

    }, [hashtagIntervalRef, content]);

    // validation check
    if (isEdit && ! originDiaryId){
        // TODO: alert that application logic is wrong
        navigation.goBack();
        return null;
    }
    

    // 핸들러 관리
    const handleBackButtonPress = () => {
        if (isWorking) return;

        navigation.goBack();
    }

    const handleDateChange = (newDate: Date) => {
        setDiaryDate(newDate);
    }

    const handleCharacterChooseButtonPress = () => {
        if (isWorking) return;

        // navigation.navigate('CharacterSelectPage', { CharacterSelectPage: { diary: newDiary } }); TODO: 이동할 페이지 확인
    }

    const handleWriteDoneButtonPress = async () => {
        if (isWorking) return;

        setIsWorking(true);
        try {
            if (! isEdit) {
                await postDiary(diaryDate, content, hashtags);
            } else if (originDiaryId) {
                await patchDiary(originDiaryId, content, hashtags)
            } else {
                throw Error("수정 상태임에도 originDiaryId가 존재하지 않습니다.");
            }
        } catch (error) {
            console.error("Error", error);
        } finally {
            setIsWorking(false);
        }

        // TODO: navigate to DiaryTimelinePage
        console.log('diary write');
    }

    const handleInputTextChange = (text: string) => {
        if (isWorking) return;

        setContent(text);
    }


    // 하위 컴포넌트 구성 정립
    return (
        <SafeAreaView style={S.styles.container}>
            <Header 
                date={diaryDate} 
                onBackPress={handleBackButtonPress} 
                onDateChange={handleDateChange}
                onCharacterChoosePress={handleCharacterChooseButtonPress}
                onDonePress={handleWriteDoneButtonPress} 
                />
            <TextInputLayer 
                text={content}
                onTextChange={handleInputTextChange}
            /> 
            <HashtagLayer 
                hashtagIds={hashtags}
            />
        </SafeAreaView>
    );
}

export default DiaryWritePage;