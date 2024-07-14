import { View } from "react-native";
import CharacterChooseButton from "./components/CharacterChooseButton/CharacterChooseButton";
import WriteDoneButton from "./components/WriteDoneButton/WriteDoneButton";
import DateInfo from "./components/DateInfo/DateInfo";
import BackButton from "../../common/BackButton/BackButton";

import * as S from "./Header.styled";

export interface HeaderProps {
    date: Date;
    onDateChange: (date: Date) => void;
    onCharacterChoosePress: () => void;
    onDonePress: () => void;
}

const Header = (props: HeaderProps) => {
    const { date, onDateChange, onCharacterChoosePress, onDonePress } = props;

    
    return (
        <View style={S.styles.header}>
            <View style={S.styles.leftContainer}>
                <BackButton style={{position: "static"}}/>
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