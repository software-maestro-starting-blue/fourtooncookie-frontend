import { Text, View } from "react-native";
import BackButton from "../../../components/common/BackButton/BackButton";

import * as S from "./Header.styled";

const Header = () => {

    return (
        <View style={S.styles.header}>
            <BackButton style={S.styles.backButton} />
            <View style={S.styles.textContainer}>
                    <Text style={S.styles.text}>캐릭터 선택</Text>
            </View>
        </View>
    );
}

export default Header;