import { View } from "react-native";
import * as S from "./Header.styled";
import CharacterChooseButton from "./components/CharacterChooseButton/CharacterChooseButton";
import WriteDoneButton from "./components/WriteDoneButton/WriteDoneButton";
import DateInfo from "./components/DateInfo/DateInfo";


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
            <View style={S.styles.leftContainer}>
                <DateInfo date={date} onDateChange={onDateChange}/>
            </View>
            <View style={S.styles.rightContainer}>
                <CharacterChooseButton onPress={onCharacterChoosePress}/>
                <WriteDoneButton onPress={onDonePress}/>
            </View>
        </View>
    );
}

export default Header;