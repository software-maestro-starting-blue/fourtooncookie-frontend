import { Image, StyleSheet, View } from "react-native";
import DateInfo from "./DateInfo/DateInfo";
import BackButton from "../../../components/common/BackButton";

import { LocalDate } from "@js-joda/core";
import CharacterIconButton from "../CharacterIconButton";
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
        <View style={styles.header}>
            <BackButton style={styles.backButton} />
            <DateInfo date={date} isChangeable={isDateChangeable} onDateChange={onDateChange} />
            <CharacterIconButton onCharacterChoosePress={handleCharacterChoosePress} />
        </View>
    );
}

export default Header;

const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
      width: '100%',
      height: 64,
    },
    backButton: {
      width: 24,
      height: 24,
      justifyContent: 'center',
      position: 'relative'
    },
  
  });