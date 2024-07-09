import { View } from "react-native";
import * as S from "./Header.styled";
import CharacterChooseButton from "../CharacterChooseButton/CharacterChooseButton";
import WriteDoneButton from "../WriteDoneButton/WriteDoneButton";


export interface HeaderProps {
    character: string;
    onBackPress: () => void;
    onDonePress: () => void;
    onCharacterChoosePress: () => void;
}

const Header = (props: HeaderProps) => {
    const { character, onBackPress, onDonePress, onCharacterChoosePress } = props;

    return (
        <View style={S.styles.header}>
            
            <CharacterChooseButton onPress={onCharacterChoosePress} character={character}/>
            <WriteDoneButton onPress={onDonePress}/>
        </View>
    );
}

export default Header;