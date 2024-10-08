import React, { useEffect, useState } from "react";
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

enum ImageActionState {
    NONE, DOWNLOAD, SHARE
}

const DiaryActionsLayout = (props: FooterProps) => {
    const { diaryId, isFavorite, ...rest } = props;

    const { mutate: updateDiaryFavorite } = useUpdateDiaryFavorite(diaryId);

    const [ imageActionState, setImageActionState ] = useState<ImageActionState>(ImageActionState.NONE);
    const { data: diaryImageBlob } = useDiaryFullImage(diaryId, imageActionState != ImageActionState.NONE);

    const handleToggleFavorite = async () => {
        updateDiaryFavorite(!isFavorite);
    };

    useEffect(() => {
        if (imageActionState == ImageActionState.NONE) return;
        if (! diaryImageBlob) return;

        const handleImageAction = async (imageActionState: ImageActionState) => {
            try {
                if (! await checkPhotoPermissions()) return;
                const fileUri = await saveBlobToFile(diaryImageBlob, diaryId);

                if (imageActionState == ImageActionState.DOWNLOAD) {
                    await saveImageToGallery(fileUri);
                    Alert.alert('이미지 저장 성공', '이미지를 갤러리에 저장했습니다.');
                }

                if (imageActionState == ImageActionState.SHARE) {
                    await shareImageFile(fileUri);
                }
            } catch (error) {
                if ( error instanceof Error && error.message == 'User did not share' ) return;

                throw error;
            }
        };

        handleImageAction(imageActionState);

        setImageActionState(ImageActionState.NONE);
    }, [imageActionState, diaryImageBlob]);

    const handleDownload = () => setImageActionState(ImageActionState.DOWNLOAD);

    const handleShare = () => setImageActionState(ImageActionState.SHARE);

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
                    <Image source={DOWNLOAD_ICON} style={S.styles.image} />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleShare}>
                    <Image source={UPLOAD_ICON} style={S.styles.image} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default DiaryActionsLayout;
