import { View } from "react-native";
import WriteDoneButton from "./WriteDoneButton/WriteDoneButton";
import DateInfo from "./DateInfo/DateInfo";
import BackButton from "../../../components/common/BackButton/BackButton";

import * as S from "./Header.styled";
import CharacterItem from "../../../components/character/CharacterItem/CharacterItem";
import { useContext, useEffect } from "react";
import GlobalSelectionCharacterStateContext from "../../../components/global/GlobalSelectionCharacter/GlobalSelectionCharacterStateContext";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../constants/routing";

export interface HeaderProps {
    date: Date;
    isDateChangeable: boolean;
    onDateChange: (date: Date) => void;
    onCharacterChoosePress: () => void;
    onDonePress: () => void;
}

const Header = (props: HeaderProps) => {
    const { date, isDateChangeable, onDateChange, onCharacterChoosePress, onDonePress, ...rest } = props;

    const { selectedCharacter, setSelectedCharacter } = useContext(GlobalSelectionCharacterStateContext);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    useEffect(() => {
        if (! selectedCharacter){
            navigation.navigate("CharacterSelectPage");
        }
    }, [navigation, selectedCharacter]);

    if (! selectedCharacter){
        return null;
    }

    return (
        <View style={S.styles.header}>
            <View style={S.styles.leftContainer}>
                <BackButton style={{position: "static"}}/>
                <DateInfo date={date} isChangeable={isDateChangeable} onDateChange={onDateChange}/>
            </View>
            <View style={S.styles.rightContainer}>
                <CharacterItem
                    character={selectedCharacter}
                    isSelected={false}
                    onPress={onCharacterChoosePress}
                />
                <WriteDoneButton onPress={onDonePress}/>
            </View>
        </View>
    );
}

export default Header;