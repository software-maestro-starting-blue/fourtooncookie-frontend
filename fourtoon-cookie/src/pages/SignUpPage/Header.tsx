import { StyleSheet, Text, View } from "react-native";
import BackButton from "../../components/common/BackButton"
import { useTranslationWithParentName } from "../../hooks/locale";
import { useFunctionWithErrorHandling } from "../../hooks/error";
import { SignUpProgres, useSignUpPageContext } from "./SignUpPageProvider";
import { useAccountState } from "../../hooks/account";


const Header = () => {
    const { signUpProgress, setSignUpProgress } = useSignUpPageContext();

    const { logout } = useAccountState();

    const loginT = useTranslationWithParentName('login');

    const { functionWithErrorHandling } = useFunctionWithErrorHandling();


    const handleBackButtonPress = functionWithErrorHandling(() => {
      if (signUpProgress == SignUpProgres.NAME) {
          logout();
          return;
      }

      setSignUpProgress(signUpProgress - 1);
  })

    return (
        <View style={styles.header}>
            <BackButton onPress={handleBackButtonPress} style={styles.backButton} />
            <Text style={styles.headerText}>{loginT("signUp")}</Text>
        </View>
    );
}

export default Header;

const styles = StyleSheet.create({
    header: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginBottom: 10,
    },
    headerText: {
      fontSize: 16,
      fontWeight: '500',
      color: '#AAAAAA',
      marginTop: 20,
    },
    backButton: {
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'flex-end',
      position: 'relative'
    }
  });
