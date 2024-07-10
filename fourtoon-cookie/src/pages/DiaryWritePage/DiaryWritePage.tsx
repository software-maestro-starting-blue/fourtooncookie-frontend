import { SafeAreaView } from "react-native";
import { Header } from "react-native/Libraries/NewAppScreen";
import TextInputLayer from "../../components/diarywrite/TextInputLayer/TextInputLayer";
import HashtagLayer from "../../components/diarywrite/HashtagLayer/HashtagLayer";
import { useEffect, useRef, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import * as S from "./DiaryWritePage.styled";
import type { Diary } from "../../types/diary";
import { getGpsPosition } from "../../systemcall/gpt";
import { Position } from "../../types/gps";
import { getWeather } from "../../apis/weather";
import { getHashtags } from "../../apis/hashtag";
import { postDiary, putDiary } from "../../apis/diary";

// 컴포넌트 인자 관리
export type DiaryWritePageParam = {
    DiaryWritePage : {
        originDate: Date,
        diary: Diary | null,
        isEdit: boolean,
    }
}

export type DiaryWritePageProp = NativeStackScreenProps<DiaryWritePageParam, 'DiaryWritePage'>;


const DiaryWritePage = ({ navigation, route }: DiaryWritePageProp) => {
    const { originDate, diary, isEdit } = route.params;

    // 상태 관리
    const hashtagIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const [date, setDate] = useState<Date>(originDate);
    const [content, setContent] = useState<string>(diary ? diary.content : "");
    const [hashtags, setHashtags] = useState<number[]>(diary ? diary.hashtags : []); // TODO: Hashtag type 구현 필요
    const [weather, setWeather] = useState<string | null>(diary ? diary.weather : null); // TODO: Weather type 구현 필요
    const [isWorking, setIsWorking] = useState<boolean>(false);
    
    
    // 이펙트 관리
    useEffect(() => {
        if (weather) return; // 이미 weather 정보가 있는 것

        const fetchWeatherData = async () => {
            try {
                const gpsPos: Position = await getGpsPosition();
                const newWeather: string = await getWeather(date, gpsPos);
                setWeather(newWeather);
            } catch (error) {
                console.error(error);
            }
        }

        fetchWeatherData();

    }, [date, isEdit]);

    useEffect(() => {
        const fetchHashtags = async () => {
            const newHashtags = await getHashtags(content);
            // TODO: hashtag들을 정렬하기
            setHashtags(newHashtags);
        }

        hashtagIntervalRef.current = setInterval(fetchHashtags, 3000);

        return () => {
            if (hashtagIntervalRef.current)
                clearInterval(hashtagIntervalRef.current);
        }

    }, [hashtagIntervalRef, content]);

    // validation check
    if (isEdit && ! diary){
        // TODO: alert that application logic is wrong
        navigation.goBack();
        return null;
    }
    

    // 핸들러 관리
    const handleBackButtonPress = () => { // TODO: 뒤로가기 버튼 눌렀을 때
        if (isWorking) return;

        navigation.goBack();
    }

    const handleDateChange = (newDate: Date) => {
        setDate(newDate);
    }

    const handleCharacterChooseButtonPress = () => {
        if (isWorking) return;

        // TODO: state props를 만들어서 보내준다. (다시 돌아왔을 때 state로 그대로 적용할 수 있도록 해야한다.)

        // navigation.navigate('CharacterSelectPage', { CharacterSelectPage: { diary: newDiary } }); TODO: 이동할 페이지 확인
    }

    const handleWriteDoneButtonPress = () => {
        if (isWorking) return;

        setIsWorking(true);

        const fetchData = async () => {
            if (! isEdit || ! diary) {
                await postDiary(date, content, hashtags);
            } else {
                await putDiary(diary.diaryId, content, hashtags)
            }
            setIsWorking(false);
        }
        
        fetchData();
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
                date={date} 
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