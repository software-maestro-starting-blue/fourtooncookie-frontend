import { View } from "react-native";
import * as S from "./Header.styled";
import CharacterChooseButton from "../CharacterChooseButton/CharacterChooseButton";
import WriteDoneButton from "../WriteDoneButton/WriteDoneButton";
import DateInfo from "../DateInfo/DateInfo";


export interface HeaderProps {
    date: Date;
    onBackPress: () => void;
    onDateChange: (date: Date) => void;
    onCharacterChoosePress: () => void;
    onDonePress: () => void;
}

const Header = (props: HeaderProps) => {
    const { date, onBackPress, onDateChange, onCharacterChoosePress, onDonePress } = props;

    // TODO: Add BackButton
    return (
        <View style={S.styles.header}>
            
            <DateInfo date={date} onDateChange={onDateChange}/>
            <CharacterChooseButton onPress={onCharacterChoosePress}/>
            <WriteDoneButton onPress={onDonePress}/>
        </View>
    );
}

export default Header;