import { Image, Text, TextStyle, TouchableOpacity } from "react-native"
import CHEVRON_RIGHT from '../../../../assets/icon/chevron-right.png';
import * as S from "./MenuWideButton.styled";

export interface MenuWideButtonProps {
    menuText: string,
    onPress: () => void;
    textStyle?: TextStyle;
}

const MenuWideButton = (props: MenuWideButtonProps) => {
    const { menuText, onPress, textStyle, ...rest } = props;

    return (
        <TouchableOpacity style={S.styles.menuItem} onPress={onPress}>
            <Text style={[S.styles.menuText, textStyle]}>{menuText}</Text>
            <Image source={CHEVRON_RIGHT} style={S.styles.chevronRight} />
        </TouchableOpacity>
    )
}

export default MenuWideButton;