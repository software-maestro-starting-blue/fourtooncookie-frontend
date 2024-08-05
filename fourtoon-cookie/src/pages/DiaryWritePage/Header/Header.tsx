import { Image, View } from "react-native";
import DateInfo from "./DateInfo/DateInfo";
import BackButton from "../../../components/common/BackButton/BackButton";

import * as S from "./Header.styled";
import CharacterItem from "../../../components/character/CharacterItem/CharacterItem";
import { useContext, useEffect } from "react";
import GlobalSelectionCharacterStateContext from "../../../components/global/GlobalSelectionCharacter/GlobalSelectionCharacterStateContext";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../constants/routing";
import { LocalDate } from "@js-joda/core";
import CharacterIconButton from "./CharacterIconButton/CharacterIconButton";

export interface HeaderProps {
    date: LocalDate;
    isDateChangeable: boolean;
    onDateChange: (date: LocalDate) => void;
    onCharacterChoosePress: () => void;
}

const Header = (props: HeaderProps) => {
    const { date, isDateChangeable, onDateChange, onCharacterChoosePress, ...rest } = props;

    const { selectedCharacter, setSelectedCharacter } = useContext(GlobalSelectionCharacterStateContext);

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