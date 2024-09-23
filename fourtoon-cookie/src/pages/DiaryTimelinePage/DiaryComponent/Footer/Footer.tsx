import React from "react";
import { Image, TouchableOpacity, View, Platform } from "react-native";
import FAVORITE_ACTIVATE_ICON from "../../../../../assets/icon/favorite-activate.png";
import FAVORITE_INACTIVATE_ICON from "../../../../../assets/icon/favorite-inactivate.png";
import DOWNLOAD_ICON from "../../../../../assets/icon/download.png";
import UPLOAD_ICON from "../../../../../assets/icon/upload.png";
import * as S from './Footer.styled';
import { useUpdateDiaryFavorite } from "../../../../hooks/server/diary";
import Share from 'react-native-share';
import * as FileSystem from 'expo-file-system';
import { getDiaryImage, saveImageToGallery } from "../../../../apis/diary";

export interface FooterProps {
    diaryId: number;
    isFavorite: boolean;
}

const DiaryActionsLayout = (props: FooterProps) => {
    const {diaryId, isFavorite, ...rest} = props;

    const { mutate: updateDiaryFavorite } = useUpdateDiaryFavorite(diaryId);

    const handleToggleFavorite = async () => {
        updateDiaryFavorite(! isFavorite);
    }

    const handleDownload = async () => {
        try {
            // 스프링 서버에서 이미지 다운
            const fileUri = await getDiaryImage(diaryId);
            // 갤러리에 이미지 저장
            await saveImageToGallery(fileUri);
        } catch (error) {
            console.error('이미지 다운로드 또는 갤러리 저장 중 오류 발생:', error);
        }
    };

    const handleShare = async () => {
        try {
            const fileUri = finalDownloadData;  // 다운로드된 이미지 파일 경로를 넣음
            const shareOptions = {
                title: '다이어리 이미지 공유',
                url: Platform.OS === 'ios' ? `file://${fileUri}` : fileUri,
                type: 'image/jpeg',
                message: '다이어리 이미지를 공유합니다.',
            };
            const result = await Share.open(shareOptions);
            console.log(result);
        } catch (error) {
            console.error('Error sharing image:', error);
        }
    };

    return (
        <View style={S.styles.footer}>
            <View style={S.styles.favoriteButton}>
                <TouchableOpacity onPress={handleToggleFavorite}>
                    <Image
                        source={isFavorite ? FAVORITE_ACTIVATE_ICON : FAVORITE_INACTIVATE_ICON}
                        style={S.styles.image}
                    />
                </TouchableOpacity>
            </View>

            <View style={S.styles.actionButtons}>
                <TouchableOpacity onPress={handleDownload}>
                    <Image source={DOWNLOAD_ICON}
                    style={S.styles.image} />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleShare}>
                    <Image source={UPLOAD_ICON}
                    style={S.styles.image} />
                </TouchableOpacity>
            </View>
            <View style={S.styles.actionButtons}>
            </View>
        </View>
    );
};

export default DiaryActionsLayout;