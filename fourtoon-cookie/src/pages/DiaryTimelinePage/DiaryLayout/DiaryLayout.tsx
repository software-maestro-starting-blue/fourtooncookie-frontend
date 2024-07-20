import React, { useState } from "react";
import { View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import ConfirmationModal from "../../../components/common/Modal/ConfirmationModal/ConfirmationModal";
import { deleteDiary as apiDeleteDiary, patchDiaryFavorite as apiToggleFavorite } from '../../../apis/diary';
import { LocalDateTime } from '@js-joda/core';
import * as S from './DiaryLayout.styled';
import { Diary } from "../../../types/diary";
import DiaryContentsLayout from "./DiaryContentsLayout/DiaryContentsLayout";
import DiaryActionsLayout from "./DiaryActionLayout/DiaryActionsLayout";
import DiaryPaintingImagesLayout from "./DiaryPaintingImagesLayout/DiaryPaintingImagesLayout";
import DiaryWritePage from "../../DiaryWritePage/DiaryWritePage";

export interface DiaryProps {
    diary: Diary,
    onDelete: (diaryId: number) => void
}

const DiaryComponent = (props: DiaryProps) => {
    const { diary, onDelete, ...rest } = props;
    const { diaryId, content, isFavorite: initialFavorite, diaryDate, paintingImageUrls, hashtagIds } = diary;
    const [isFavorite, setIsFavorite] = useState(initialFavorite);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigation = useNavigation();

    const toggleFavorite = async () => {
        try {
            await apiToggleFavorite(diaryId, isFavorite);
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error("An error occurred while deleting the diary: ", error);
        }
    };

    const handleDownload = () => {
    };

    const handleShare = () => {
    };

    const handleEdit = () => {
        navigation.navigate('DiaryWritePage', { diary: diary, isEdit: true });
    };

    const handleDelete = () => {
        setIsModalVisible(true);
    };

    const confirmDelete = async () => {
        try {
            await apiDeleteDiary(diaryId);
            setIsModalVisible(false);
            onDelete(diaryId);
        } catch (error) {
            console.error("An error occurred while deleting the diary: ", error);
        }
        
    };

    return (
        <View style={S.styles.container}>
            <DiaryPaintingImagesLayout imageUrls={paintingImageUrls} />
            <DiaryActionsLayout
                isFavorite={isFavorite}
                toggleFavorite={toggleFavorite}
                onDownload={handleDownload}
                onShare={handleShare}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            <DiaryContentsLayout
                content={content}
                hashtagIds={hashtagIds} 
                diaryDate={diaryDate}            
            />
            <ConfirmationModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onConfirm={confirmDelete}
                message="정말 삭제하시겠습니까?"
            />
        </View>
    );
};

export default DiaryComponent;
