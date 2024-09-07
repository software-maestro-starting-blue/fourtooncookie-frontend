import { Text, View } from "react-native";
import BackButton from "../../../components/common/BackButton/BackButton";

import * as S from "./Header.styled";
import { useContext } from "react";
import GlobalSelectionCharacterStateContext from "../../../components/global/GlobalSelectionCharacter/GlobalSelectionCharacterStateContext";

const Header = () => {

    const { selectedCharacter } = useContext(GlobalSelectionCharacterStateContext);

    const handleBackButtonPressWhenCharacterNotSelected = () => {
        //TODO: 백버튼 눌렀을 때 handleError로 처리하기 (TSK-45)
    }

    return (
        <View style={S.styles.header}>
            <BackButton style={S.styles.backButton} onPress={selectedCharacter ? undefined : handleBackButtonPressWhenCharacterNotSelected} />
            <View style={S.styles.textContainer}>
                    <Text style={S.styles.text}>캐릭터 선택</Text>
            </View>
        </View>
    );
}

export default Header;