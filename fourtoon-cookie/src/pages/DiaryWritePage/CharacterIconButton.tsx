import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { useSelectedCharacterStore } from "../../hooks/store/selectedCharacter";

export interface CharacterIconButtonProps {
    onCharacterChoosePress: () => void;
}

const CharacterIconButton = (props: CharacterIconButtonProps) => {
    const { onCharacterChoosePress, ...rest } = props;

    const { selectedCharacter } = useSelectedCharacterStore();

    return (
        <TouchableOpacity onPress={onCharacterChoosePress} style={styles.container}>
            <Image 
                source={{ uri: selectedCharacter?.selectionThumbnailUrl }} 
                style={styles.image} 
            />
        </TouchableOpacity>
    )

}

export default CharacterIconButton;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        right: 10,
    },
    image: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderColor: 'rgba(0, 0, 0, 0.03)',
        borderWidth: 1,
    }
})