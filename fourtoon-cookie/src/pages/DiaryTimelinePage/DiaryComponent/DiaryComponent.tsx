import React, { useState } from "react";
import { View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import ConfirmationModal from "../../../components/common/Modal/ConfirmationModal/ConfirmationModal";
import { patchDiaryFavorite } from '../../../apis/diary';
import { Diary } from "../../../types/diary";
import DiaryContentsLayout from "./DiaryContentsLayout/DiaryContentsLayout";
import DiaryActionsLayout from "./DiaryActionLayout/DiaryActionsLayout";
import DiaryPaintingImagesLayout from "./DiaryPaintingImagesLayout/DiaryPaintingImagesLayout";
import DiaryWritePage from "../../DiaryWritePage/DiaryWritePage";
import * as S from './DiaryComponent.styled';

export interface DiaryProps {
    diary: Diary,
    onDelete: () => void
}

const DiaryComponent = (props: DiaryProps) => {
    const { diary, onDelete, ...rest } = props;
    const { diaryId, content, isFavorite: initialFavorite, diaryDate, paintingImageUrls, hashtagIds } = diary;
    
    const [isFavorite, setIsFavorite] = useState(initialFavorite);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigation = useNavigation();

    const handleToggleFavorite = async () => {
        try {
            await patchDiaryFavorite(diaryId, isFavorite);
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error("An error occurred while deleting the diary: ", error);
        }
    };

    const handleDownload = () => {
        //TODO: 다운로드 로직 구현
    };

    const handleShare = () => {
        //TODO: 공유 로직 구현
    };

    const handleEdit = () => {
        navigation.navigate(DiaryWritePage, { diary: diary, isEdit: true });
    };

    const handleDelete = () => {
        setIsModalVisible(true);
    };

    const handleConfirmDelete = async () => {
        try {
            setIsModalVisible(false);
            onDelete();
        } catch (error) {
            console.error("An error occurred while deleting the diary: ", error);
        }
        
    };

    return (
        <View style={S.styles.container}>
            <DiaryPaintingImagesLayout imageUrls={paintingImageUrls} />
            <DiaryActionsLayout
                isFavorite={isFavorite}
                onToggleFavorite={handleToggleFavorite}
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
                onConfirm={handleConfirmDelete}
                message="정말 삭제하시겠습니까?"
            />
        </View>
    );
};

export default DiaryComponent;
