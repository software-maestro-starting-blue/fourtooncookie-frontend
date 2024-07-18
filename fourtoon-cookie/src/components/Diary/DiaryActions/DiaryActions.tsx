import React from "react";
import { View } from "react-native";
import IconButton from "../../common/IconButton/IconButton";
import Button from "../../common/Button/Button";
import FavoriteIcon from "../../../../assets/icon/favorite.png";
import UnFavoriteIcon from "../../../../assets/icon/unFavorite.png";
import * as S from './DiaryActions.styled';

interface DiaryActionsProps {
    isFavorite: boolean;
    toggleFavorite: () => void;
    onDownload: () => void;
    onShare: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

const DiaryActions = (props: DiaryActionsProps) => {
    const {isFavorite, toggleFavorite, onDownload, onShare, onEdit, onDelete, ...rest} = props;

    return (
        <View style={S.styles.footer}>
            <View style={S.styles.favoriteButton}>
                <IconButton
                    imageSource={isFavorite ? FavoriteIcon : UnFavoriteIcon}
                    onPress={toggleFavorite}
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

export default DiaryActions;
