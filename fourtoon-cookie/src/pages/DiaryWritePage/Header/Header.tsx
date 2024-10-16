import { Image, View } from "react-native";
import DateInfo from "./DateInfo/DateInfo";
import BackButton from "../../../components/common/BackButton/BackButton";

import * as S from "./Header.styled";
import { LocalDate } from "@js-joda/core";
import CharacterIconButton from "./CharacterIconButton/CharacterIconButton";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../types/routing";
import { useFunctionWithErrorHandling } from "../../../hooks/error";

export interface HeaderProps {
    date: LocalDate;
    isDateChangeable: boolean;
    onDateChange: (date: LocalDate) => void;
}

const Header = (props: HeaderProps) => {
    const { date, isDateChangeable, onDateChange, ...rest } = props;

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const { functionWithErrorHandling } = useFunctionWithErrorHandling();

    const handleCharacterChoosePress = functionWithErrorHandling(() => {
        navigation.navigate("CharacterSelectPage");
    });

    return (
        <View style={S.styles.header}>
            <BackButton style={S.styles.backButton} />
            <DateInfo date={date} isChangeable={isDateChangeable} onDateChange={onDateChange} />
            <CharacterIconButton onCharacterChoosePress={handleCharacterChoosePress} />
        </View>
    );
}

export default Header;