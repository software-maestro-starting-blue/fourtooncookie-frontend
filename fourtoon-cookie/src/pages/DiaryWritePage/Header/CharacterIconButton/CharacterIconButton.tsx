import { useContext } from "react";
import { Image, TouchableOpacity } from "react-native";
import * as S from "./CharacterIconButton.styled";
import { useSelectedCharacterStore } from "../../../../store/selectedCharacter";

export interface CharacterIconButtonProps {
    onCharacterChoosePress: () => void;
}

const CharacterIconButton = (props: CharacterIconButtonProps) => {
    const { onCharacterChoosePress, ...rest } = props;

    const { selectedCharacter } = useSelectedCharacterStore();

    if (! selectedCharacter){
        return null;
    }

    return (
        <TouchableOpacity onPress={onCharacterChoosePress} style={S.styles.container}>
            <Image 
                source={{ uri: selectedCharacter.selectionThumbnailUrl }} 
                style={S.styles.image} 
            />
        </TouchableOpacity>
    )

}

export default CharacterIconButton;