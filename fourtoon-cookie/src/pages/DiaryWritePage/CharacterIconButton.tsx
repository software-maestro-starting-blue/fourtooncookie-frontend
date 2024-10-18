import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { useSelectedCharacterStore } from "../../hooks/store/selectedCharacter";
import { useFunctionWithErrorHandling } from "../../hooks/error";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/routing";


const CharacterIconButton = () => {
    const { selectedCharacter } = useSelectedCharacterStore();

    const navigation = useNavigation<NavigationProp<RootStackParamList>>()

    const { functionWithErrorHandling } = useFunctionWithErrorHandling();

    const handleCharacterChoosePress = functionWithErrorHandling(() => {
        navigation.navigate("CharacterSelectPage");
    });

    return (
        <TouchableOpacity onPress={handleCharacterChoosePress} style={styles.container}>
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