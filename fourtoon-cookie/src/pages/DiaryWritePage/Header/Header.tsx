import { Image, View } from "react-native";
import DateInfo from "./DateInfo/DateInfo";
import BackButton from "../../../components/common/BackButton/BackButton";

import * as S from "./Header.styled";
import CharacterItem from "../../../components/character/CharacterItem/CharacterItem";
import { useContext } from "react";
import { LocalDate } from "@js-joda/core";
import CharacterIconButton from "./CharacterIconButton/CharacterIconButton";
import { useSelectedCharacterStore } from "../../../store/selectedCharacter";

export interface HeaderProps {
    date: LocalDate;
    isDateChangeable: boolean;
    onDateChange: (date: LocalDate) => void;
    onCharacterChoosePress: () => void;
}

const Header = (props: HeaderProps) => {
    const { date, isDateChangeable, onDateChange, onCharacterChoosePress, ...rest } = props;

    const { selectedCharacter } = useSelectedCharacterStore();

    if (! selectedCharacter){
        return null;
    }

    return (
        <View style={S.styles.header}>
            <BackButton style={S.styles.backButton} />
            <DateInfo date={date} isChangeable={isDateChangeable} onDateChange={onDateChange} />
            <CharacterIconButton onCharacterChoosePress={onCharacterChoosePress} />
        </View>
    );
}

export default Header;