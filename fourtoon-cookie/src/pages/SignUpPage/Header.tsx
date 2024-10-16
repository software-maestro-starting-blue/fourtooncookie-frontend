import { StyleSheet, Text, View } from "react-native";
import BackButton from "../../components/common/BackButton"
import { useTranslationWithParentName } from "../../hooks/locale";

export interface HeaderProps {
    onBackButtonPress: () => void
}

const Header = (props: HeaderProps) => {
    const { onBackButtonPress, ...rest } = props;

    const loginT = useTranslationWithParentName('login');

    return (
        <View style={styles.header}>
            <BackButton onPress={onBackButtonPress} style={styles.backButton} />
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
