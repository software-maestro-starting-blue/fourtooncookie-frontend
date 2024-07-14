import React from "react";
import { View } from "react-native";
import { DiarySavedResponse } from "../../../pages/DiaryTimelinePage/DiaryTimelinePage";
import Diary from "../Diary/Diary";
import * as S from './Diaries.styled';

export interface DiariesProps {
    diaries: DiarySavedResponse[];
}

const Diaries = ({ diaries }: DiariesProps) => {
    return (
        <View style={S.styles.container}>
            {diaries && diaries.map((diary, index) => (
                <Diary
                    key={index}
                    diaryId={diary.diaryId}
                    content={diary.content}
                    isFavorite={diary.isFavorite}
                    diaryDate={diary.diaryDate}
                    paintingImageUrls={diary.paintingImageUrls}
                    hastagIds={diary.hashtagIds}
                    characterId={diary.characterId}
                />
            ))}
        </View>
    );
};

export default Diaries;
