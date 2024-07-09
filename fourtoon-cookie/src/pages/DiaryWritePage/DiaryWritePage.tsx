import { SafeAreaView } from "react-native";
import { Header } from "react-native/Libraries/NewAppScreen";
import TextInputLayer from "../../components/diarywrite/TextInputLayer/TextInputLayer";
import HashtagLayer from "../../components/diarywrite/HashtagLayer/HashtagLayer";
import { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import * as S from "./DiaryWritePage.styled";
import { Diary } from "../../types/diary";
import { getGpsPosition } from "../../systemcall/gpt";
import { Position } from "../../types/gps";
import { getWeather } from "../../apis/weather";

// 컴포넌트 인자 관리
export type DiaryWritePageParam = {
    DiaryWritePage : {
        date: Date,
        diary: Diary | null,
        isEdit: boolean,
        isBackFromCharacterChoose: boolean
    }
}

export type DiaryWritePageProp = NativeStackScreenProps<DiaryWritePageParam, 'DiaryWritePage'>;


const DiaryWritePage = ({ navigation, route }: DiaryWritePageProp) => {
    const { date, diary, isEdit, isBackFromCharacterChoose } = route.params;

    // params validation
    if ((isEdit || isBackFromCharacterChoose) && (diary == null)){
        // TODO: alert that application logic is wrong
        navigation.goBack();
    }


    // 상태 관리
    const [content, setContent] = useState<string>(diary ? diary.content : "");
    const [hashtags, setHashtags] = useState<string[]>(diary ? diary.hashtags : []); // TODO: Hashtag type 구현 필요
    const [weather, setWeather] = useState<string>(diary ? diary.weather : ""); // TODO: Weather type 구현 필요

    
    // 이펙트 관리
    useEffect(() => {
        if (isEdit || isBackFromCharacterChoose) return; // 이미 weather 정보가 있는 것

        const fetchWeatherData = async () => {
            try {
                const gpsPos: Position = await getGpsPosition();
                const newWeather: string = await getWeather(date, gpsPos);
                setWeather(newWeather);
            } catch (error) {
                // TODO: 어떤 오류인지 확인해보기
                // TODO: 서버 오류가 발생한 것이면 이에 대한 안내를 띄우기
            }
        }

        fetchWeatherData();
        
    }, [date, isEdit, isBackFromCharacterChoose]);

    useEffect(() => {
        // TODO: 자동 해시태그 기능 구현
        
    }, [hashtags]);
    

    // 핸들러 관리
    const handleBackButtonPress = () => {
        // TODO: 뒤로가기 버튼 눌렀을 때
        navigation.goBack();
    }

    const handleCharacterChooseButtonPress = () => {
        // Diary content를 만들어서 보내준다. (다시 돌아왔을 때 state로 그대로 적용할 수 있도록 해야한다.)
        const newDiary: Diary = {
            diaryId: diary ? diary.diaryId : -1,
            content: content,
            hashtags: hashtags,
            weather: weather
        }

        navigation.navigate('CharacterSelectPage', { CharacterSelectPage: { diary: newDiary } });
    }

    const handleDiaryWriteButtonPress = () => {
        // TODO: 일기 작성 버튼 눌렀을 때
        const newDiary: Diary = {
            diaryId: diary ? diary.diaryId : -1,
            content: content,
            hashtags: hashtags,
            weather: weather
        }
        const fetchData = async () => {
            try {
                // 서버 api 호출
                const response = await fetch('', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newDiary),
                });
                
                if (!response.ok) {
                    throw new Error('Failed to save diary');
                }
                
                const data = await response.json();
                console.log('Diary saved successfully:', data);
                navigation.navigate("DiaryTimelinePage");
            } catch (error) {
                console.error('Failed to save diary:', error);
            }
        }
        
        fetchData();

        console.log('diary write');
    }

    const handleTextInputChange = (text: string) => {
        // TODO: 텍스트 입력 시
        setContent(text);
    }

    const handleHashtagChange = (hashtags: string[]) => {
        // TODO: 해시태그 변경 시
        setHashtags(hashtags);
    }


    // 하위 컴포넌트 구성 정립
    return (
        <SafeAreaView style={S.styles.container}>
            <Header />
            <TextInputLayer />
            <HashtagLayer />
        </SafeAreaView>
    );
}

export default DiaryWritePage;