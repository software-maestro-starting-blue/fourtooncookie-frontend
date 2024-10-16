import React from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet } from 'react-native';
import type { Character } from '../../types/character';
import { useSelectedCharacterStore } from '../../hooks/store/selectedCharacter';

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
        <TouchableOpacity style={styles.characterContainer} onPress={handlePress}>
            <View style={styles.imageContainer}>
                <Image 
                    source={{ uri: character.selectionThumbnailUrl }} 
                    style={styles.image} 
                />
                {isSelected && <CheckMark />}
            </View>
            <Text style={styles.name}>{character.name}</Text>
        </TouchableOpacity>
    );
};

const CheckMark = () => {
    return (
        <View style={styles.checkmarkWrapper}>
            <View style={styles.checkmark}>
                <Text style={styles.checkmarkText}>✓</Text>
            </View>
        </View>
    );
}

export default CharacterItem;

const styles = StyleSheet.create({
    characterContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 8,
        margin: 3,
        width: "32%",
        height: "auto",
        position: 'relative',
    },
    imageContainer: {
        width: "100%",
        aspectRatio: 1,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 55,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.03)',
    },
    name: {
        width: "100%",
        height: 20,
        fontFamily: 'Pretendard',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'center',
        letterSpacing: -0.005,
        color: '#212121',
    },
    checkmarkWrapper: {
        position: 'absolute',
        width: 36,
        height: 36,
        left: "60%",
        top: "60%",
        backgroundColor: '#FFC426',
        borderColor: '#FFFFFF',
        borderWidth: 2,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
      },
      checkmark: {
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
      },
      checkmarkText: {
        color: '#000000',
        fontSize: 18,
      },
});
