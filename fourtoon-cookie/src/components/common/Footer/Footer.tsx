import React from "react";
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from "react-native";
import { NavigationProp, useNavigation } from '@react-navigation/native';
import HomeInactivateIcon from '../../../../assets/icon/home-inactivate.png';
import HomeActivateIcon from '../../../../assets/icon/home-activate.png';
import DrawIcon from '../../../../assets/icon/draw.png';
import PersonInactivateIcon from '../../../../assets/icon/person-inactivate.png';
import PersonActivateIcon from '../../../../assets/icon/person-activate.png';

import * as S from './Footer.styled';
import { RootStackParamList } from "../../../constants/routing";

export interface FooterProps {
    isHomeActivate: boolean;
    isPersonActivate: boolean;
}

const Footer = (props: FooterProps) => {
    const { isHomeActivate, isPersonActivate } = props;
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const icons = [
        { source: isHomeActivate ? HomeActivateIcon : HomeInactivateIcon, pageName: 'DiaryTimelinePage', name: '홈' },
        { source: DrawIcon, pageName: 'DiaryWritePage', name: '글쓰기' },
        { source: isPersonActivate ? PersonActivateIcon : PersonInactivateIcon, pageName: 'SettingPage', name: '마이' },
    ];
        
    return (
        <View style={S.styles.container}>
        {icons.map((icon, index) => (
            <FooterItem
                key={index}
                imageSource={icon.source}
                name={icon.name}
                onPress={() => navigation.navigate(icon.pageName as never)}
            />
        ))}
        </View>
        
    );
}

interface FooterItemProps {
    key: number;
    imageSource: ImageSourcePropType;
    name: string;
    onPress: () => void;
}

const FooterItem = (props: FooterItemProps) => {
    const { key, imageSource, name, onPress } = props;

    return (
        <TouchableOpacity key={key} style={S.styles.itemContainer} onPress={onPress}>
            <Image source={imageSource} style={S.styles.icon} />
            <Text style={S.styles.activeText}>{name}</Text>
        </TouchableOpacity>
    );
}

export default Footer;
