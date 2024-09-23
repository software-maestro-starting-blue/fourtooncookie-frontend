import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
// import Share from 'react-native-share';
// import shareToKakao from "./share/shareToKakao";
import FAVORITE_ACTIVATE_ICON from "../../../../../assets/icon/favorite-activate.png";
import FAVORITE_INACTIVATE_ICON from "../../../../../assets/icon/favorite-inactivate.png";
import DOWNLOAD_ICON from "../../../../../assets/icon/download.png";
import UPLOAD_ICON from "../../../../../assets/icon/upload.png";
import * as S from './Footer.styled';
import { useUpdateDiaryFavorite, useDownloadDiaryImage } from "../../../../hooks/server/diary";


export interface FooterProps {
    diaryId: number;
    isFavorite: boolean;
}

const DiaryActionsLayout = (props: FooterProps) => {
    const {diaryId, isFavorite, ...rest} = props;

    const { mutate: updateDiaryFavorite } = useUpdateDiaryFavorite(diaryId);
    const { data: downloadData, isLoading, refetch: downloadDiaryImage } = useDownloadDiaryImage(diaryId);

    const handleToggleFavorite = async () => {
        updateDiaryFavorite(! isFavorite);
    }

    const handleDownload = async () => {
        downloadDiaryImage();
    };

    const handleShare = async () => {

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