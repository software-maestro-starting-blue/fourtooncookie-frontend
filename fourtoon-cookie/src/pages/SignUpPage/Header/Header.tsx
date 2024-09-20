import { Text, View } from "react-native";
import BackButton from "../../../components/common/BackButton/BackButton"
import * as S from "./Header.styled";

export interface HeaderProps {
    onBackButtonPress: () => void
}

const Header = (props: HeaderProps) => {
    const { onBackButtonPress, ...rest } = props;

    return (
        <View style={S.styles.header}>
            <BackButton onPress={onBackButtonPress} style={S.styles.backButton} />
            <Text style={S.styles.headerText}>회원가입</Text>
        </View>
    );
}

export default Header;