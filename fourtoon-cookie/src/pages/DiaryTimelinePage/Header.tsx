import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import IMAGE_LOGO from "../../../assets/logo/logo-12.png";
import TEXT_LOGO from "../../../assets/logo/logo-10.png";

const Header = () => {
    return (
        <View style={styles.header}>
            <Image source={IMAGE_LOGO} style={styles.headerImageLogo} />
            <Image source={TEXT_LOGO} style={styles.headerTextLogo}/>
        </View>
    );
}

export default Header;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
        paddingLeft: 20,
        gap: 8
    },
    headerImageLogo: {
        position: 'relative',
        width: 28,
        height: 28,
        resizeMode: 'contain',
    },
    headerTextLogo: {
        position: 'relative',
        width: 210,
        height: 23,
        resizeMode: 'contain',
    },
});
