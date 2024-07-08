import { SafeAreaView } from "react-native";
import { Header } from "react-native/Libraries/NewAppScreen";
import TextInputLayer from "../../components/diarywrite/TextInputLayer/TextInputLayer";
import HashtagLayer from "../../components/diarywrite/HashtagLayer/HashtagLayer";

import * as S from "./DiaryWritePage.styled";
import { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Diary } from "../../types/diary";

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
    // TODO: state 넘어올 때 처리 (수정 상태이거나, 캐릭터 선택 후 상태)
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
                // TODO: 클라이언트 GPS 권한 설정이 문제이면 이에 대한 안내를 띄우기
                // TODO: 서버 오류가 발생한 것이면 이에 대한 안내를 띄우기
            }
        }

        fetchWeatherData();
    }, [date, isEdit, isBackFromCharacterChoose]);

    useEffect(() => {
        // TODO: 자동 태깅 기능 구현

    }, [hashtags]);
    

    // 핸들러 관리
    const onBackButtonPress = () => {
        // TODO: 뒤로가기 버튼 눌렀을 때
        navigation.goBack();
    }

    const onCharacterChooseButtonPress = () => {
        // TODO: 캐릭터 선택 버튼 눌렀을 때
        // Diary content를 만들어서 보내준다. (다시 돌아왔을 때 state로 그대로 적용할 수 있도록 해야한다.)
        console.log('character choose');
    }

    const onDiaryWriteButtonPress = () => {
        // TODO: 일기 작성 버튼 눌렀을 때
        console.log('diary write');
    }

    const onTextInputChange = (text: string) => {
        // TODO: 텍스트 입력 시
        setContent(text);
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


// 로직 관리
type Position = [number, number];

type getGpsPositionType = () => Promise<Position>;

const getGpsPosition: getGpsPositionType = async () => {
    // TODO: GPS 권한을 통해 위치 정보를 가지고 오기
    return [0, 0];
}

type getWeatherType = (date: Date, gpsPos: Position) => Promise<string>;

const getWeather: getWeatherType = async (date: Date, gpsPos: Position) => {
    return "";
}

export default DiaryWritePage;