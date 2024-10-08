import React from "react";
import { View } from "react-native";
import { Diary, DiaryStatus } from "../../../types/diary";
import DiaryContentsLayout from "./DiaryContentsLayout/DiaryContentsLayout";
import DiaryPaintingImagesLayout from "./DiaryPaintingImagesLayout/DiaryPaintingImagesLayout";
import * as S from './DiaryComponent.styled';
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import DiaryPaintingImageLoadingLayout from "./DiaryPaintingImageLoadingLayout/DiaryPaintingImageLoadingLayout";
import DiaryPaintingImageFailedLayout from "./DiaryPaintingImageFailedLayout/DiaryPaintingImageFailedLayout";
import { useDiaryById } from "../../../hooks/server/diary";

export interface DiaryProps {
    diaryId: number,
}

const DiaryComponent = (props: DiaryProps) => {
    const { diaryId, ...rest } = props;
    const { data: diary } = useDiaryById(diaryId);

    if (!diary) return null;
    
    const { content, isFavorite, diaryDate, paintingImageUrls, characterId, diaryStatus } = diary;

    return (
        <View style={S.styles.container}>
            <Header
                diaryId={diaryId}
                characterId={diary.characterId}
                date={diaryDate}
            />
            <DiaryBody
                diaryStatus={diaryStatus}
                paintingImageUrls={paintingImageUrls}
                selectedCharacterId={characterId}
            />
            <DiaryContentsLayout
                content={content}
            />
            <Footer
                diaryId={diaryId}
                isFavorite={isFavorite}
            />
        </View>
    );
};

export default DiaryComponent;

interface DiaryBodyProps {
    diaryStatus: DiaryStatus,
    paintingImageUrls: string[],
    selectedCharacterId: number,
}

const DiaryBody = (props: DiaryBodyProps) => {
    const { diaryStatus, paintingImageUrls, selectedCharacterId, ...rest } = props;

    switch(diaryStatus) {
        case DiaryStatus.IN_PROGRESS:
            return (
                <DiaryPaintingImageLoadingLayout 
                    selectedCharacterId={selectedCharacterId}
                />
            );
        
        case DiaryStatus.COMPLETED:
            if (paintingImageUrls.length === 4) {
                return (
                    <DiaryPaintingImagesLayout
                        imageUrls={paintingImageUrls}
                    />
                );
            }
    }

    return (
        <DiaryPaintingImageFailedLayout />
    );
}