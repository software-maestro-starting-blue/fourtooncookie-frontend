import React, { useState } from "react";
import { View, Text } from "react-native";
import DiaryPaintingImages from "../DiaryPaintingImage/DiaryPaintingImages";
import IconButton from "../../common/IconButton/IconButton";
import Button from "../../common/Button/Button";
import LikeIcon from "../../../icon/like.png";
import UnLikeIcon from "../../../icon/unlike.png";
import * as S from './Diary.styled';

export interface DiaryProps {
    diaryId: number;
    content: string;
    isFavorite: boolean;
    diaryDate: string;
    paintingImageUrls: string[];
    hastagIds: number[];
    characterId: number;
} 

const Diary = (props: DiaryProps) => {
    const { diaryId, content, isFavorite: initialFavorite, diaryDate, paintingImageUrls, hastagIds, characterId } = props;
    const [isFavorite, setIsFavorite] = useState(initialFavorite);

    const toggleFavorite = async () => {
        console.log(diaryId);
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

    return (
        <View style={S.styles.container}>
            <DiaryPaintingImages imageUrls={paintingImageUrls} />
            <View style={S.styles.footer}>
                <View style={S.styles.footerLikeButton}>
                    <IconButton
                        imageSource={isFavorite ? LikeIcon : UnLikeIcon}
                        onPress={toggleFavorite}
                        imageStyle={S.styles.likeImage}
                    />
                </View>
                <View style={S.styles.settingButtons}>
                    <Button title="다운" onPress={() => { console.log("다운 버튼") }} style={S.styles.button} />
                    <Button title="공유" onPress={() => { console.log("공유 버튼") }} style={S.styles.button} />
                    <Button title="⋯" onPress={() => { console.log("일기 설정 버튼") }} style={S.styles.button} />
                </View>
            </View>
            <View style={S.styles.contents}>
                <Text>{content}</Text>

                <Button title="더 보기" onPress={() => { console.log("더 보기 버튼") }} style={S.styles.more} textStyle={S.styles.moreText} />
            </View>
            <View style={S.styles.date}>
                <Text>{diaryDate}</Text>
            </View>
        </View>
    );
};

export default Diary;
