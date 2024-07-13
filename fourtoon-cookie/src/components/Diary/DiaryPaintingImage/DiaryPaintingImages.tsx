import React from "react";
import { View } from "react-native";
import ImageButton from "../../common/ImageButton/ImageButton";
import * as S from './DiaryPaintingImages.styled';

export interface DiaryPaintingImagesProps {
    imageUrls: string[];
}

const DiaryPaintingImages = ({ imageUrls }: DiaryPaintingImagesProps) => {
    return (
        <View style={S.styles.grid}>
            {imageUrls.map((imageUrl, index) => (
                <ImageButton 
                    key={index}
                    imageUrl={imageUrl} 
                    onPress={() => console.log(`grid[${index}] click`)} 
                    style={S.styles.imageLayout} 
                    imageStyle={S.styles.image} 
                />
            ))}
        </View>
    );
};

export default DiaryPaintingImages;
