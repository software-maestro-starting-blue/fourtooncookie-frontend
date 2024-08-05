import React from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import type { Character } from '../../../types/character';
import * as S from './CharacterItem.styled';

export interface CharacterItemProps {
    character: Character;
    isSelected: boolean;
    onPress: () => void;
}

const CharacterItem = (props:CharacterItemProps) => {
    const { character, isSelected, onPress, ...rest } = props;

    const handleError = () => {
        throw new Error('Image failed to load:' + character.selectionThumbnailUrl);
    }
                
    return (
        <TouchableOpacity style={S.styles.characterContainer} onPress={onPress}>
            <View style={S.styles.imageContainer}>
                <Image 
                    source={{ uri: character.selectionThumbnailUrl }} 
                    style={S.styles.image} 
                    onError={() => handleError()}
                />
                {isSelected && <CheckMark />}
            </View>
            <Text style={S.styles.name}>{character.name}</Text>
        </TouchableOpacity>
    );
};

const CheckMark = () => {
    return (
        <View style={S.styles.checkmarkWrapper}>
            <View style={S.styles.checkmark}>
                <Text style={S.styles.checkmarkText}>✓</Text>
            </View>
        </View>
    );
}

export default CharacterItem;
