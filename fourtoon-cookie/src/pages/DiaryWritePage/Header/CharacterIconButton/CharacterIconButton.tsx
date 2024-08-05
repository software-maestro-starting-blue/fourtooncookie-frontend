import { useContext } from "react";
import GlobalSelectionCharacterStateContext from "../../../../components/global/GlobalSelectionCharacter/GlobalSelectionCharacterStateContext";
import { Image, TouchableOpacity } from "react-native";
import * as S from "./CharacterIconButton.styled";

export interface CharacterIconButtonProps {
    onCharacterChoosePress: () => void;
}

const CharacterIconButton = (props: CharacterIconButtonProps) => {
    const { onCharacterChoosePress, ...rest } = props;

    const { selectedCharacter, setSelectedCharacter } = useContext(GlobalSelectionCharacterStateContext);

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