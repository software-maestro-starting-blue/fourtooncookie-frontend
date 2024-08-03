import { Text, View } from "react-native";
import BackButton from "../../../components/common/BackButton/BackButton"
import * as S from "./Header.styled";

const Header = () => {
    return (
        <View style={S.styles.header}>
            <BackButton style={S.styles.backButton} />
            <Text style={S.styles.headerText}>회원가입</Text>
        </View>
    );
}

export default Header;