import { StyleSheet, Text, View } from "react-native";
import BackButton from "../../components/common/BackButton/BackButton";
import { useSelectedCharacterStore } from "../../hooks/store/selectedCharacter";

import { SelectedCharacterNotExistError } from "../../types/error/character/SelectedCharacterNotExistError";
import { useFunctionWithErrorHandling } from "../../hooks/error";
import { useTranslationWithParentName } from "../../hooks/locale";

const Header = () => {

    const { selectedCharacter } = useSelectedCharacterStore();

    const { functionWithErrorHandling } = useFunctionWithErrorHandling();

    const t = useTranslationWithParentName('pages.characterSelectPage.header');

    const errorT = useTranslationWithParentName('error');

    const handleBackButtonPressWhenCharacterNotSelected = functionWithErrorHandling(() => {
        throw new SelectedCharacterNotExistError(errorT("characterNotSelected"))
    });

    return (
        <View style={styles.header}>
            <BackButton style={styles.backButton} onPress={selectedCharacter ? undefined : handleBackButtonPressWhenCharacterNotSelected} />
            <View style={styles.textContainer}>
                    <Text style={styles.text}>{t("characterSelect")}</Text>
            </View>
        </View>
    );
}

export default Header;

const styles = StyleSheet.create({
    header: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      paddingLeft: 20,
      paddingRight: 20,
      position: 'relative',
      width: '100%',
      height: 64,
    },
    backButton: {
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'flex-end',
      position: 'relative'
    },
    textContainer: {
      flex: 1, // flexbox의 남은 공간을 차지하도록 설정
      flexDirection: 'row',
      justifyContent: 'center', // 가로 중앙 정렬
      alignItems: 'center', // 세로 중앙 정렬
      height: '100%', // 전체 높이를 차지하도록 설정
  
  },
    text: {
        fontFamily: 'Pretendard',
        fontWeight: '600',
        fontSize: 17,
        lineHeight: 24,
        display: 'flex',
        alignItems: 'center',
        letterSpacing: -0.5,
        color: '#212121',
    },
  
  });