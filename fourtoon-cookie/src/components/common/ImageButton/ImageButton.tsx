import React from 'react';
import { TouchableOpacity, Image, ViewStyle, ImageStyle } from 'react-native';
import * as S from './ImageButton.styled';

export interface ImageButtonProps {
    imageUrl: string;
    onPress: () => void;
    style?: ViewStyle;
    imageStyle?: ImageStyle;
}

const ImageButton = (props: ImageButtonProps) => {
    const { imageUrl, onPress, style, imageStyle } = props;
    return (
        <TouchableOpacity onPress={onPress} style={[S.styles.button, style]}>
            <Image source={{ uri: imageUrl }} style={[S.styles.image, imageStyle]} />
        </TouchableOpacity>
    );
};

export default ImageButton;
