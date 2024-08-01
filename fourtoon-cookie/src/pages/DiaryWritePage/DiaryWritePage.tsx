import { SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Header from "./Header/Header";
import TextInputLayout from "./TextInputLayout/TextInputLayout";
import HashtagLayout from "./HashtagLayout/HashtagLayout";

import { getGpsPosition } from "../../systemcall/gpt";
import { getWeather } from "../../apis/weather";
import { getHashtag } from "../../apis/hashtag";
import { postDiary, patchDiary, getDiary } from "../../apis/diary";
import { RootStackParamList } from "../../constants/routing";
import type { Position } from "../../types/gps";

import * as S from "./DiaryWritePage.styled";


export type DiaryWritePageProp = NativeStackScreenProps<RootStackParamList, 'DiaryWritePage'>;

const DiaryWritePage = ({ navigation, route }: DiaryWritePageProp) => {
    const { diary, isEdit, ...rest } = route.params || { diary: undefined, isEdit: false };

    
    const [diaryDate, setDiaryDate] = useState<Date>(diary ? diary.diaryDate : new Date());
    const [content, setContent] = useState<string>(diary ? diary.content : "");
    const [hashtags, setHashtags] = useState<number[]>(diary ? diary.hashtagIds : []); // TODO: Hashtag type 구현 필요
    const [weather, setWeather] = useState<number | null>(null); // TODO: Weather type 구현 필요
    const [isWorking, setIsWorking] = useState<boolean>(false);

    const hashtagsContainWeather: number[] = (weather) ? [weather, ...hashtags] : hashtags

    // TODO: hashtagIds에서 weather 추출하기
    /** TODO 실제 릴리즈 버전에서 활용 예정

    useEffect(() => {
        if (weather != null) return;

        const fetchWeatherData = async () => {
            try {
                const gpsPos: Position = await getGpsPosition();

                const newWeather: number = await getWeather(diaryDate, gpsPos);

                setWeather(newWeather);
            } catch (e) {
                console.error(e);
                // TODO: 날씨 정보를 가져오지 못했다는 토스트(Toast) 보내기
            }
        }

        fetchWeatherData();

    }, [diaryDate, weather]);

    useEffect(() => {
        const fetchHashtags = async () => {
            try {
                const newHashtags: number[] = await getHashtag(content);

                // TODO: hashtag들을 정렬하기
                setHashtags(newHashtags);
            } catch (e) {
                console.error(e);
                // TODO: 해시태그 정보를 가져오지 못했다는 토스트(Toast) 보내기
            }
        }

        const hashtagInterval = setInterval(fetchHashtags, 3000);

        return () => {
            if (hashtagInterval)
                clearInterval(hashtagInterval);
        }

    }, [content]); **/


    if (isEdit && ! diary){
        // TODO: 이 상황이 잘못되었다는 토스트(Toast) 보내기
        navigation.goBack();
        return null;
    }


    const handleDiaryDateChange = (newDate: Date) => {
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
                await postDiary(diaryDate, content, hashtagsContainWeather);
            } else if (diary) {
                await patchDiary(diary.diaryId, content, hashtagsContainWeather)
            } else {
                throw Error("수정 상태임에도 originDiaryId가 존재하지 않습니다.");
            }

            // TODO: navigate to DiaryTimelinePage
        } catch (error) {
            console.error("Error", error);
            // TODO: 에러 발생 시 토스트(Toast) 보내기
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