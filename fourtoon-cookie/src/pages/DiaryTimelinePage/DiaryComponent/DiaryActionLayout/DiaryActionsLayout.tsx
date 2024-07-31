import React from "react";
import { View } from "react-native";
import IconButton from "../../../../components/common/IconButton/IconButton";
import Button from "../../../../components/common/Button/Button";
import FavoriteIcon from "../../../../../assets/icon/favorite.png";
import UnFavoriteIcon from "../../../../../assets/icon/unFavorite.png";
import * as S from './DiaryActionsLayout.styled';

interface DiaryActionsLayoutProps {
    isFavorite: boolean;
    onToggleFavorite: () => void;
    onDownload: () => void;
    onShare: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

const DiaryActionsLayout = (props: DiaryActionsLayoutProps) => {
    const {isFavorite, onToggleFavorite, onDownload, onShare, onEdit, onDelete, ...rest} = props;

    return (
        <View style={S.styles.footer}>
            <View style={S.styles.favoriteButton}>
                <IconButton
                    imageSource={isFavorite ? FavoriteIcon : UnFavoriteIcon}
                    onPress={onToggleFavorite}
                    imageStyle={S.styles.favoriteImage}
                />
            </View>
            <View style={S.styles.actionButtons}>
                <Button title="다운" onPress={onDownload} style={S.styles.button} />
                <Button title="공유" onPress={onShare} style={S.styles.button} />
                <Button title="수정" onPress={onEdit} style={S.styles.button} />
                <Button title="삭제" onPress={onDelete} style={S.styles.button} />
            </View>
        </View>
    );
};

export default DiaryActionsLayout;