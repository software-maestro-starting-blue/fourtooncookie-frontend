import { View } from "react-native";
import * as S from "./Header.styled";
import CharacterChooseButton from "../CharacterChooseButton/CharacterChooseButton";
import WriteDoneButton from "../WriteDoneButton/WriteDoneButton";
import DateInfo from "../DateInfo/DateInfo";


export interface HeaderProps {
    date: Date;
    onBackPress: () => void;
    onDatePress: (date: Date) => void;
    onDonePress: () => void;
    onCharacterChoosePress: () => void;
}

const Header = (props: HeaderProps) => {
    const { date, onBackPress, onDatePress, onDonePress, onCharacterChoosePress } = props;

    const character = "cookie"; // TODO: 로컬의 정보를 통해 캐릭터의 정보를 가지고 옵니다.

    // TODO: Add BackButton
    return (
        <View style={S.styles.header}>
            
            <DateInfo date={date} onPress={onDatePress}/>
            <CharacterChooseButton onPress={onCharacterChoosePress} character={character}/>
            <WriteDoneButton onPress={onDonePress}/>
        </View>
    );
}

export default Header;