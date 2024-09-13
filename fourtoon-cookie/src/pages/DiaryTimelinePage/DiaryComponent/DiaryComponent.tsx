import React, { useContext, useState } from "react";
import { View } from "react-native";
import { NavigationProp, useNavigation } from '@react-navigation/native';
import ConfirmationModal from "../../../components/common/Modal/ConfirmationModal/ConfirmationModal";
import { patchDiaryFavorite } from '../../../apis/diary';
import { Diary } from "../../../types/diary";
import DiaryContentsLayout from "./DiaryContentsLayout/DiaryContentsLayout";
import DiaryPaintingImagesLayout from "./DiaryPaintingImagesLayout/DiaryPaintingImagesLayout";
import * as S from './DiaryComponent.styled';
import { RootStackParamList } from "../../../constants/routing";
import { GlobalErrorInfoType } from "../../../types/error";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import handleError from "../../../error/errorhandler";
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
