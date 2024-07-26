import React from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';
import type { Character } from '../../../types/character';
import * as S from './CharacterItem.styled';

interface CharacterItemProps {
    character: Character;
    isSelected: boolean;
    onPress: () => void;
}

const CharacterItem = (props:CharacterItemProps) => {
    const { character, isSelected, onPress } = props;

    return (
        <TouchableOpacity style={[S.styles.characterContainer, isSelected && S.styles.selectedCharacter]} onPress={onPress}>
            <Image 
                source={{ uri: character.selectionThumbnailUrl }} 
                style={S.styles.image} 
                onError={() => console.log('Image failed to load:', character.selectionThumbnailUrl)}
            />
            <Text style={S.styles.name}>{character.name}</Text>
            {isSelected && <Text style={S.styles.checkmark}>✔</Text>}
        </TouchableOpacity>
    );
};

export default CharacterItem;
