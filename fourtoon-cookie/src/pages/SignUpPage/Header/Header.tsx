import { Text, View } from "react-native";
import BackButton from "../../../components/common/BackButton/BackButton"
import * as S from "./Header.styled";
import { useTranslationWithParentName } from "../../../hooks/locale";

export interface HeaderProps {
    onBackButtonPress: () => void
}

const Header = (props: HeaderProps) => {
    const { onBackButtonPress, ...rest } = props;

    const loginT = useTranslationWithParentName('login');

    return (
        <View style={S.styles.header}>
            <BackButton onPress={onBackButtonPress} style={S.styles.backButton} />
            <Text style={S.styles.headerText}>{loginT("signUp")}</Text>
        </View>
    );
}

export default Header;