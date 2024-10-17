import { StyleSheet, TextInput } from "react-native";
import { useTranslationWithParentName } from "../../hooks/locale";
import Container from "./Container";
import { useSignUpPageContext } from "./SignUpPageProvider";

const NameInputLayout = () => {
    const { name, setName } = useSignUpPageContext();

    const t = useTranslationWithParentName('pages.signUpPage.nameInputLayout');

    return (
        <Container title={t("title")}>
            <TextInput
                style={styles.input}
                placeholder={t("placeholder")}
                placeholderTextColor="#CCCCCC"
                value={name}
                onChangeText={setName}
            />
        </Container>
    )

}

export default NameInputLayout;

const styles = StyleSheet.create({
    input: {
      borderBottomWidth: 1,
      borderBottomColor: '#212121',
      fontSize: 24,
      width: '100%',
      paddingVertical: 5,
    },
  });