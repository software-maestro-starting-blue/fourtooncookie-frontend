import React, { useState } from "react";
import { View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import DiaryPaintingImages from "../DiaryPaintingImage/DiaryPaintingImages";
import DiaryActions from "../DiaryActions/DiaryActions";
import Contents from "../DiaryContent/DiaryContent";
import DiaryDate from "../DiaryDate/DiaryDate";
import ConfirmationModal from "../../common/Modal/ConfirmationModal/ConfirmationModal";
import { deleteDiary as apiDeleteDiary, toggleDiaryFavorite as apiToggleFavorite } from '../../../apis/diaryApi';
import { LocalDateTime } from '@js-joda/core';
import * as S from './Diary.styled';

export interface DiaryProps {
    diaryId: number,
    content: string,
    isFavorite: boolean,
    diaryDate: LocalDateTime,
    paintingImageUrls: string[],
    hashtagIds: number[],
    characterId: number,
    onDelete: (diaryId: number) => void
}

const Diary = (props: DiaryProps) => {
    const { diaryId, content, isFavorite: initialFavorite, diaryDate, paintingImageUrls, onDelete, ...rest } = props;
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
        navigation.navigate('DiaryWritePage', { diaryProps: props });
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
            <DiaryPaintingImages imageUrls={paintingImageUrls} />
            <DiaryActions
                isFavorite={isFavorite}
                toggleFavorite={toggleFavorite}
                onDownload={handleDownload}
                onShare={handleShare}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            <Contents content={content} />
            <DiaryDate diaryDate={diaryDate} />
            
            <ConfirmationModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onConfirm={confirmDelete}
                message="정말 삭제하시겠습니까?"
            />
        </View>
    );
};

export default Diary;
