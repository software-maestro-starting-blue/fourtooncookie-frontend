import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import TimelineIcon from"../../../icon/timeline.png";
import SettingIcon from"../../../icon/setting.png";
import WriteIcon from"../../../icon/write.png";
import SearchIcon from"../../../icon/search.png";
import IconButton from "../IconButton/IconButton";
import * as S from './Footer.styled';

const Footer = () => {
    const navigation = useNavigation();

    return (
        <View style={S.styles.container}>
            <IconButton imageSource={TimelineIcon} onPress={() => navigation.navigate('DiaryTimelinePage' as never)} />
            <IconButton imageSource={SearchIcon} onPress={() => navigation.navigate('DiarySearchPage' as never)} />
            <IconButton imageSource={WriteIcon} onPress={() => navigation.navigate('DiaryWritePage' as never)} />
            <IconButton imageSource={SettingIcon} onPress={() => navigation.navigate('SettingsPage' as never)} />
        </View>
    );
}

export default Footer;
