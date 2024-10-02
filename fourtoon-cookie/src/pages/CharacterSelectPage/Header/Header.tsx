import { Text, View } from "react-native";
import BackButton from "../../../components/common/BackButton/BackButton";
import { useSelectedCharacterStore } from "../../../hooks/store/selectedCharacter";

import * as S from "./Header.styled";
import { SelectedCharacterNotExistError } from "../../../types/error/character/SelectedCharacterNotExistError";
import { functionWithErrorHandling } from "../../../hooks/error";

const Header = () => {

    const { selectedCharacter } = useSelectedCharacterStore();

    const handleBackButtonPressWhenCharacterNotSelected = () => {
        throw new SelectedCharacterNotExistError('캐릭터가 선택되지 않았습니다. 캐릭터를 선택해주세요.')
    });

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