import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import IMAGE_LOGO from "../../../../assets/logo/logo-12.png";
import TEXT_LOGO from "../../../../assets/logo/logo-10.png";
import * as S from './Header.styled';

const Header = () => {
    return (
        <View style={S.styles.header}>
            <Image source={IMAGE_LOGO} style={S.styles.headerImageLogo} />
            <Image source={TEXT_LOGO} style={S.styles.headerTextLogo}/>
        </View>
    );
}

export default Header;
