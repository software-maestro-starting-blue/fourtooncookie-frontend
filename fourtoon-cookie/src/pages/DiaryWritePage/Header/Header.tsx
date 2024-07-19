import { View } from "react-native";
import CharacterChooseButton from "./CharacterChooseButton/CharacterChooseButton";
import WriteDoneButton from "./WriteDoneButton/WriteDoneButton";
import DateInfo from "./DateInfo/DateInfo";
import BackButton from "../../../components/common/BackButton/BackButton";

import * as S from "./Header.styled";

export interface HeaderProps {
    date: Date;
    isDateChangeable: boolean;
    onDateChange: (date: Date) => void;
    onCharacterChoosePress: () => void;
    onDonePress: () => void;
}

const Header = (props: HeaderProps) => {
    const { date, isDateChangeable, onDateChange, onCharacterChoosePress, onDonePress, ...rest } = props;

    
    return (
        <View style={S.styles.header}>
            <View style={S.styles.leftContainer}>
                <BackButton style={{position: "static"}}/>
                <DateInfo date={date} isChangeable={isDateChangeable} onDateChange={onDateChange}/>
            </View>
            <View style={S.styles.rightContainer}>
                <CharacterChooseButton onPress={onCharacterChoosePress}/>
                <WriteDoneButton onPress={onDonePress}/>
            </View>
        </View>
    );
}

export default Header;