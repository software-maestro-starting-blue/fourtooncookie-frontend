import React from "react";
import { Image, TouchableOpacity, View, Platform } from "react-native";
import FAVORITE_ACTIVATE_ICON from "../../../../../assets/icon/favorite-activate.png";
import FAVORITE_INACTIVATE_ICON from "../../../../../assets/icon/favorite-inactivate.png";
import DOWNLOAD_ICON from "../../../../../assets/icon/download.png";
import UPLOAD_ICON from "../../../../../assets/icon/upload.png";
import * as S from './Footer.styled';
import { useUpdateDiaryFavorite, useDownloadDiaryImage } from "../../../../hooks/server/diary";
import Share from 'react-native-share';
import * as FileSystem from 'expo-file-system';

export interface FooterProps {
    diaryId: number;
    isFavorite: boolean;
}

const DiaryActionsLayout = (props: FooterProps) => {
    const {diaryId, isFavorite, ...rest} = props;

    const { mutate: updateDiaryFavorite } = useUpdateDiaryFavorite(diaryId);
    const { data: downloadData, isLoading, refetch: downloadDiaryImage } = useDownloadDiaryImage(diaryId);
    
    // 목데이터 설정
    const mockDownloadData = 'https://via.placeholder.com/250'
    const finalDownloadData = downloadData || mockDownloadData; 

    const handleToggleFavorite = async () => {
        updateDiaryFavorite(! isFavorite);
    }

    const handleDownload = async () => {
        downloadDiaryImage();
    };


    const handleShare = async () => {
        try {
            const fileUri = finalDownloadData;
            // 로컬에 있는 파일을 공유할 때 사용할 옵션 설정
            const shareOptions = {
                title: '다이어리 이미지 공유',
                url:Platform.OS === 'ios' ? `file://${fileUri}` : fileUri, // ios, android
                type: 'image/jpeg',
                message: '다이어리 이미지를 공유합니다.',
            };
    
            // 파일 공유 실행
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