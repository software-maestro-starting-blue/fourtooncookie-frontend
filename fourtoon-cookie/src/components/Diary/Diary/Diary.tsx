import React, { useState } from "react";
import { View } from "react-native";
import DiaryPaintingImages from "../DiaryPaintingImage/DiaryPaintingImages";
import DiaryActions from "../DiaryActions/DiaryActions";
import Contents from "..//DiaryContent/DiaryContent";
import DiaryDate from "../DiaryDate/DiaryDate";
import { LocalDateTime } from '@js-joda/core';
import * as S from './Diary.styled';

export interface DiaryProps {
    diaryId: number,
    content: string,
    isFavorite: boolean,
    diaryDate: LocalDateTime,
    paintingImageUrls: string[],
    hashtagIds: number[],
    characterId: number
} 

const Diary = (props: DiaryProps) => {
    const { diaryId, content, isFavorite: initialFavorite, diaryDate, paintingImageUrls } = props;
    const [isFavorite, setIsFavorite] = useState(initialFavorite);

    const toggleFavorite = async () => {
        try {
            const response = await fetch(`http://localhost:8080/diary/favorite/${diaryId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(!isFavorite),
            });

            if (response.status === 200) {
                setIsFavorite(!isFavorite);
            } else {
                console.log("Failed to update favorite status");
            }
        } catch (error) {
            console.log("Error updating favorite status: ", error);
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
    };

    const handleDelete = () => {
        console.log("일기 삭제 버튼");
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
        </View>
    );
};

export default Diary;
