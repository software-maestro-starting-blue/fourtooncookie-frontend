import React from "react";
import { View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import IconButton from "../IconButton/IconButton";
import TimelineIcon from"../../../../assets/icon/timeline.png";
import SettingIcon from"../../../../assets/icon/setting.png";
import WriteIcon from"../../../../assets/icon/write.png";

import * as S from './Footer.styled';

const Footer = () => {
    const navigation = useNavigation();

    const icons = [
        { source: TimelineIcon, pageName: 'DiaryTimelinePage' },
        { source: WriteIcon, pageName: 'DiaryWritePage' },
        { source: SettingIcon, pageName: 'SettingPage' },
    ];
        
    return (
        <View style={S.styles.container}>
        {icons.map((icon, index) => (
        <IconButton
            key={index}
            imageSource={icon.source}
            onPress={() => navigation.navigate(icon.pageName as never)}
        />
        ))}
        </View>
        
    );
}

export default Footer;
