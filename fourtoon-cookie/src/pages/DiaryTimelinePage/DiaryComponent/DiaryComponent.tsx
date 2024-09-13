import React from "react";
import { View } from "react-native";
import { Diary } from "../../../types/diary";
import DiaryContentsLayout from "./DiaryContentsLayout/DiaryContentsLayout";
import DiaryPaintingImagesLayout from "./DiaryPaintingImagesLayout/DiaryPaintingImagesLayout";
import * as S from './DiaryComponent.styled';
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import DiaryPaintingImageLoadingLayout from "./DiaryPaintingImageLoadingLayout/DiaryPaintingImageLoadingLayout";

export interface DiaryProps {
    diary: Diary,
}

const DiaryComponent = (props: DiaryProps) => {
    const { diary, ...rest } = props;
    const { diaryId, content, isFavorite, diaryDate, paintingImageUrls, characterId } = diary;

    return (
        <View style={S.styles.container}>
            <Header
                diaryId={diaryId}
                characterId={diary.characterId}
                date={diaryDate}
            />
            {
                (paintingImageUrls && paintingImageUrls.length == 4) 
                ?
                <DiaryPaintingImagesLayout imageUrls={paintingImageUrls} />
                :
                <DiaryPaintingImageLoadingLayout selectedCharacterId={characterId} />
            }
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
