import React from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';
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
        <TouchableOpacity style={[S.styles.characterContainer, isSelected && S.styles.selectedCharacter]} onPress={onPress}>
            <Image 
                source={{ uri: character.selectionThumbnailUrl }} 
                style={S.styles.image} 
                onError={() => handleError()}
            />
            <Text style={S.styles.name}>{character.name}</Text>
            {isSelected && <Text style={S.styles.checkmark}>✔</Text>}
        </TouchableOpacity>
    );
};

export default CharacterItem;
