import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View, Alert, Linking, StyleSheet } from "react-native";
import FAVORITE_ACTIVATE_ICON from "../../../../assets/icon/favorite-activate.png";
import FAVORITE_INACTIVATE_ICON from "../../../../assets/icon/favorite-inactivate.png";
import DOWNLOAD_ICON from "../../../../assets/icon/download.png";
import UPLOAD_ICON from "../../../../assets/icon/upload.png";
import { useUpdateDiaryFavorite } from "../../../hooks/server/diary";
import { useDiaryFullImage } from "../../../hooks/server/diary";
import { checkPhotoPermissions, saveBlobToFile, saveImageToGallery, shareImageFile } from "../../../system/image";
import { useEffectWithErrorHandling, useFunctionWithErrorHandling } from "../../../hooks/error";
import { useTranslationWithParentName } from "../../../hooks/locale";

export interface DiaryActionsLayoutProps {
    diaryId: number;
    isFavorite: boolean;
}

enum ImageActionState {
    NONE, DOWNLOAD, SHARE
}

const DiaryActionsLayout = (props: DiaryActionsLayoutProps) => {
    const { diaryId, isFavorite, ...rest } = props;

    const { mutate: updateDiaryFavorite } = useUpdateDiaryFavorite(diaryId);

    const [ imageActionState, setImageActionState ] = useState<ImageActionState>(ImageActionState.NONE);
    const { data: diaryImageBlob } = useDiaryFullImage(diaryId, imageActionState != ImageActionState.NONE);

    const { functionWithErrorHandling, asyncFunctionWithErrorHandling } = useFunctionWithErrorHandling();

    const t = useTranslationWithParentName("pages.diaryTimelinePage.diaryComponent.footer");

    const handleToggleFavorite = functionWithErrorHandling(() => {
        updateDiaryFavorite(!isFavorite);
    });

    const handleImageAction = asyncFunctionWithErrorHandling(async (imageActionState: ImageActionState, diaryImageBlob: Blob) => {
        try {
            if (! await checkPhotoPermissions()) return;
            const fileUri = await saveBlobToFile(diaryImageBlob, diaryId);

            if (imageActionState == ImageActionState.DOWNLOAD) {
                await saveImageToGallery(fileUri);
                Alert.alert(t("imageDownloadSuccess"), t("imageDownloadSuccessDetail"));
            }

            if (imageActionState == ImageActionState.SHARE) {
                await shareImageFile(fileUri);
            }
        } catch (error) {
            if ( error instanceof Error && error.message == 'User did not share' ) return;

            throw error;
        }
    });

    useEffectWithErrorHandling(() => {
        if (imageActionState == ImageActionState.NONE) return;
        if (! diaryImageBlob) return;

        handleImageAction(imageActionState, diaryImageBlob);

        setImageActionState(ImageActionState.NONE);
    }, [imageActionState, diaryImageBlob]);

    const handleDownload = functionWithErrorHandling(() => setImageActionState(ImageActionState.DOWNLOAD));

    const handleShare = functionWithErrorHandling(() => setImageActionState(ImageActionState.SHARE));

    return (
        <View style={styles.footer}>
            <View style={styles.favoriteButton}>
                <TouchableOpacity onPress={handleToggleFavorite}>
                    <Image
                        source={isFavorite ? FAVORITE_ACTIVATE_ICON : FAVORITE_INACTIVATE_ICON}
                        style={styles.image}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.actionButtons}>
                <TouchableOpacity onPress={handleDownload}>
                    <Image source={DOWNLOAD_ICON} style={styles.image} />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleShare}>
                    <Image source={UPLOAD_ICON} style={styles.image} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default DiaryActionsLayout;

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    favoriteImage: {
        width: 30,
        height: 30,
    },
    favoriteButton: {
        flex: 1,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    image: {
        width: 40,
        height: 40,
        marginLeft: 10,
        marginRight: 10,
        resizeMode: 'contain',
    },
});
