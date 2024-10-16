import { Image, StyleSheet, Text, TextStyle, TouchableOpacity } from "react-native"
import CHEVRON_RIGHT from '../../../assets/icon/chevron-right.png';

export interface MenuWideButtonProps {
    menuText: string,
    onPress: () => void;
    textStyle?: TextStyle;
}

const MenuWideButton = (props: MenuWideButtonProps) => {
    const { menuText, onPress, textStyle, ...rest } = props;

    return (
        <TouchableOpacity style={styles.menuItem} onPress={onPress}>
            <Text style={[styles.menuText, textStyle]}>{menuText}</Text>
            <Image source={CHEVRON_RIGHT} style={styles.chevronRight} />
        </TouchableOpacity>
    )
}

export default MenuWideButton;

const styles = StyleSheet.create({
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        width: 350,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
    },
    menuText: {
        fontFamily: 'Pretendard',
        fontWeight: '400',
        fontSize: 17,
        lineHeight: 22,
        letterSpacing: -0.005,
        color: '#212121',
    },
    chevronRight: {
        width: 24,
        height: 24,
    },
})