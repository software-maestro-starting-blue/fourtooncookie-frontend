import { Image, View } from "react-native";
import DateInfo from "./DateInfo/DateInfo";
import BackButton from "../../../components/common/BackButton/BackButton";

import * as S from "./Header.styled";
import CharacterItem from "../../../components/character/CharacterItem/CharacterItem";
import { useContext } from "react";
import { LocalDate } from "@js-joda/core";
import CharacterIconButton from "./CharacterIconButton/CharacterIconButton";
import { useSelectedCharacterStore } from "../../../store/selectedCharacter";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../constants/routing";

export interface HeaderProps {
    date: LocalDate;
    isDateChangeable: boolean;
    onDateChange: (date: LocalDate) => void;
}

const Header = (props: HeaderProps) => {
    const { date, isDateChangeable, onDateChange, ...rest } = props;

    const { selectedCharacter } = useSelectedCharacterStore();

    if (! selectedCharacter){
        return null;
    }

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleCharacterChoosePress = () => {
        navigation.navigate("CharacterSelectPage");
    }

    return (
        <View style={S.styles.header}>
            <BackButton style={S.styles.backButton} />
            <DateInfo date={date} isChangeable={isDateChangeable} onDateChange={onDateChange} />
            <CharacterIconButton onCharacterChoosePress={handleCharacterChoosePress} />
        </View>
    );
}

export default Header;