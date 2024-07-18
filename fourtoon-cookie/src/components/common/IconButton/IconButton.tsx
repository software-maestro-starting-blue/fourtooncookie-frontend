import React from 'react';
import { TouchableOpacity, Image, StyleSheet, ViewStyle, ImageStyle, ImageSourcePropType } from 'react-native';
import * as S from './IconButton.styled';

export interface IconButtonProps {
    imageSource: ImageSourcePropType;
    onPress: () => void;
    style?: ViewStyle;
    imageStyle?: ImageStyle;
}

const IconButton = (props: IconButtonProps) => {
    const { imageSource, onPress, style, imageStyle, ...rest } = props;
    return (
        <TouchableOpacity onPress={onPress} style={[S.styles.button, style]}>
            <Image source={imageSource} style={[S.styles.image, imageStyle]} />
        </TouchableOpacity>
    );
};

export default IconButton;
