import { Text, View } from "react-native";
import BackButton from "../../../components/common/BackButton/BackButton";
import { useSelectedCharacterStore } from "../../../hooks/store/selectedCharacter";

import * as S from "./Header.styled";
import { SelectedCharacterNotExistError } from "../../../types/error/character/SelectedCharacterNotExistError";
import { useFunctionWithErrorHandling } from "../../../hooks/error";
import { useTranslationWithParentName } from "../../../hooks/locale";

const Header = () => {

    const { selectedCharacter } = useSelectedCharacterStore();

    const { functionWithErrorHandling } = useFunctionWithErrorHandling();

    const t = useTranslationWithParentName('pages.characterSelectPage.header');

    const errorT = useTranslationWithParentName('error');

    const handleBackButtonPressWhenCharacterNotSelected = functionWithErrorHandling(() => {
        throw new SelectedCharacterNotExistError(errorT("characterNotSelected"))
    });

    return (
        <View style={S.styles.header}>
            <BackButton style={S.styles.backButton} onPress={selectedCharacter ? undefined : handleBackButtonPressWhenCharacterNotSelected} />
            <View style={S.styles.textContainer}>
                    <Text style={S.styles.text}>{t("characterSelect")}</Text>
            </View>
        </View>
    );
}

export default Header;