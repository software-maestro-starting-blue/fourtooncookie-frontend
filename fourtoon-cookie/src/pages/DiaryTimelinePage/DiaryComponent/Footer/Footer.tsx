import React from "react";
import { Image, TouchableOpacity, View, Alert, Linking } from "react-native";
import FAVORITE_ACTIVATE_ICON from "../../../../../assets/icon/favorite-activate.png";
import FAVORITE_INACTIVATE_ICON from "../../../../../assets/icon/favorite-inactivate.png";
import DOWNLOAD_ICON from "../../../../../assets/icon/download.png";
import UPLOAD_ICON from "../../../../../assets/icon/upload.png";
import * as S from './Footer.styled';
import { useUpdateDiaryFavorite } from "../../../../hooks/server/diary";
import { useDiaryFullImage } from "../../../../hooks/server/diary"; // React Query 훅 사용
import { checkPhotoPermissions, saveBlobToFile, saveImageToGallery, shareImageFile } from "../../../../system/image";

export interface FooterProps {
    diaryId: number;
    isFavorite: boolean;
}

const DiaryActionsLayout = (props: FooterProps) => {
    const { diaryId, isFavorite, ...rest } = props;

    const { mutate: updateDiaryFavorite } = useUpdateDiaryFavorite(diaryId);
    
    const { data: diaryImageBlob, isLoading } = useDiaryFullImage(diaryId);

    const handleToggleFavorite = async () => {
        updateDiaryFavorite(!isFavorite);
    };

    const handleDownload = async () => {
        try {
            if (!checkPhotoPermissions()) return;
            if (isLoading || !diaryImageBlob) return;
            const fileUri = await saveBlobToFile(diaryImageBlob, diaryId);
            await saveImageToGallery(fileUri);
            Alert.alert('이미지 저장 성공', '이미지를 갤러리에 저장했습니다.');
        } catch (error) {
            console.error('이미지 다운로드 또는 갤러리 저장 중 오류 발생:', error);
        }
    };

    const handleShare = async () => {
        try {
            if (!checkPhotoPermissions()) return;
            if (isLoading || !diaryImageBlob) return;

            const fileUri = await saveBlobToFile(diaryImageBlob, diaryId);
            await shareImageFile(fileUri);
        } catch (error) {
            if (error instanceof Error) {
                if (error.message == 'User did not share') return;
                console.error('이미지 공유 중 오류 발생:', error);
                Alert.alert('공유 오류', '이미지 공유에 실패했습니다.');
            }
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
                <TouchableOpacity onPress={handleDownload} disabled={isLoading}>
                    <Image source={DOWNLOAD_ICON} style={S.styles.image} />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleShare} disabled={isLoading}>
                    <Image source={UPLOAD_ICON} style={S.styles.image} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default DiaryActionsLayout;
