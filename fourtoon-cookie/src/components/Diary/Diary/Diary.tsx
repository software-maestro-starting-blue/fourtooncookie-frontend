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
    const { diaryId, content, isFavorite: initialFavorite, diaryDate, paintingImageUrls, onDelete } = props;
    const [isFavorite, setIsFavorite] = useState(initialFavorite);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigation = useNavigation();

    const toggleFavorite = async () => {
        const success = await apiToggleFavorite(diaryId, isFavorite);
        if (success) {
            setIsFavorite(!isFavorite);
        }
    };

    const handleDownload = () => {
        console.log("다운 버튼");
    };

    const handleShare = () => {
        console.log("공유 버튼");
    };

    const handleEdit = () => {
        console.log("일기 수정 버튼");
        navigation.navigate('DiaryWritePage', { diaryProps: props });
    };

    const handleDelete = () => {
        setIsModalVisible(true);
    };

    const confirmDelete = async () => {
        const success = await apiDeleteDiary(diaryId);
        if (success) {
            setIsModalVisible(false);
            onDelete(diaryId); // Call onDelete prop
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
