import React from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import type { Character } from '../../../types/character';
import * as S from './CharacterItem.styled';
import { useSelectedCharacterStore } from '../../../hooks/store/selectedCharacter';

export interface CharacterItemProps {
    character: Character;
}

const CharacterItem = (props:CharacterItemProps) => {
    const { character, ...rest } = props;

    const { selectedCharacter, setSelectedCharacter } = useSelectedCharacterStore();

    const isSelected: boolean = selectedCharacter?.id == character.id;

    const handlePress = () => {
        setSelectedCharacter(character);
    }
                
    return (
        <TouchableOpacity style={S.styles.characterContainer} onPress={handlePress}>
            <View style={S.styles.imageContainer}>
                <Image 
                    source={{ uri: character.selectionThumbnailUrl }} 
                    style={S.styles.image} 
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
