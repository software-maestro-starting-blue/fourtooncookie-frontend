import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import FortuneCookieIcon from "../../../icon/fourtune_cookie.png"
import * as S from './Header.styled';

const Header = () => {
    return (
        <View style={S.styles.header}>
            <Image source={FortuneCookieIcon} style={S.styles.headerIcon} />
            <Text style={S.styles.headerText}>포툰쿠키</Text>
        </View>
    );
}

export default Header;
