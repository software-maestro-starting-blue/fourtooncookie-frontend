import { SafeAreaView } from "react-native";
import { useEffect, useRef, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Header from "../../components/diarywrite/Header/Header";
import TextInputLayer from "../../components/diarywrite/TextInputLayer/TextInputLayer";
import HashtagLayer from "../../components/diarywrite/HashtagLayer/HashtagLayer";

import { getGpsPosition } from "../../systemcall/gpt";
import { getWeather } from "../../apis/weather";
import { getHashtag } from "../../apis/hashtag";
import { postDiary, patchDiary, getDiary } from "../../apis/diary";
import { RootStackParamList } from "../../constants/routing";
import type { Position } from "../../types/gps";
import type { Diary } from "../../types/diary";

import * as S from "./DiaryWritePage.styled";

// 컴포넌트 인자 관리
export type DiaryWritePageProp = NativeStackScreenProps<RootStackParamList, 'DiaryWritePage'>;

const DiaryWritePage = ({ navigation, route }: DiaryWritePageProp) => {
    const { date, originDiaryId, isEdit, ...rest } = route.params || { isEdit: false };

    // 상태 관리
    const [diaryDate, setDiaryDate] = useState<Date>(date || new Date());
    const [content, setContent] = useState<string>("");
    const [hashtags, setHashtags] = useState<number[]>([]); // TODO: Hashtag type 구현 필요
    const [weather, setWeather] = useState<number | null>(null); // TODO: Weather type 구현 필요
    const [isWorking, setIsWorking] = useState<boolean>(false);

    const hashtagsContainWeather: number[] = (weather) ? [weather, ...hashtags] : hashtags
    
    
    // 이펙트 관리
    useEffect(() => {
        if (! isEdit || ! originDiaryId) return;

        const fetchDiaryData = async () => {
            const diary: Diary | null = await getDiary(originDiaryId);

            if (! diary) {
                // TODO: 다이어리 내용을 못 가지고 왔다는 토스트(Toast) 보내기
                return;
            }
            
            setDiaryDate(diary.date);
            setContent(diary.content);
            setHashtags(diary.hashtagIds);
            // TODO: 다이어리 내용을 반영하였다는 토스트(Toast) 보내기
        }

        fetchDiaryData();
    }, [isEdit]);

    useEffect(() => {
        if (weather != null) return;

        const fetchWeatherData = async () => {
            const gpsPos: Position | null = await getGpsPosition();

            if (gpsPos == null) return;

            const newWeather: number | null = await getWeather(diaryDate, gpsPos);

            setWeather(newWeather);
        }

        fetchWeatherData();

    }, [diaryDate, weather]);

    useEffect(() => {
        const fetchHashtags = async () => {
            const newHashtags: number[] | null = await getHashtag(content);
            
            if (newHashtags == null) return;

            // TODO: hashtag들을 정렬하기
            setHashtags(newHashtags);
            console.log("해시태그 업데이트");
        }

        const hashtagInterval = setInterval(fetchHashtags, 3000);

        return () => {
            if (hashtagInterval)
                clearInterval(hashtagInterval);
        }

    }, [content]);

    // validation check
    if (isEdit && ! originDiaryId){
        // TODO: 이 상황이 잘못되었다는 토스트(Toast) 보내기
        navigation.goBack();
        return null;
    }
    

    // 핸들러 관리
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
        
        let result: boolean = false;

        try {
            if (! isEdit) {
                result = await postDiary(diaryDate, content, hashtagsContainWeather);
            } else if (originDiaryId) {
                result = await patchDiary(originDiaryId, content, hashtagsContainWeather)
            } else {
                throw Error("수정 상태임에도 originDiaryId가 존재하지 않습니다.");
            }
        } catch (error) {
            console.error("Error", error);
        } finally {
            setIsWorking(false);
        }

        if (! result) return;

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
                isDateChangeable={! isEdit}
                onDateChange={handleDateChange}
                onCharacterChoosePress={handleCharacterChooseButtonPress}
                onDonePress={handleWriteDoneButtonPress} 
                />
            <TextInputLayer 
                text={content}
                onTextChange={handleInputTextChange}
            /> 
            <HashtagLayer 
                hashtagIds={hashtagsContainWeather}
            />
        </SafeAreaView>
    );
}

export default DiaryWritePage;