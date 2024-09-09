import React, { useMemo } from "react";
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from "react-native";
import { NavigationProp, useNavigation } from '@react-navigation/native';
import HomeInactivateIcon from '../../../../../assets/icon/home-inactivate.png';
import HomeActivateIcon from '../../../../../assets/icon/home-activate.png';
import DrawIcon from '../../../../../assets/icon/draw.png';
import PersonInactivateIcon from '../../../../../assets/icon/person-inactivate.png';
import PersonActivateIcon from '../../../../../assets/icon/person-activate.png';

import { RootStackParamList } from "../../../../constants/routing";

import * as S from './Footer.styled';

export interface FooterProps {
    isHomeActivate: boolean;
    isPersonActivate: boolean;
}

const Footer = (props: FooterProps) => {
    const { isHomeActivate, isPersonActivate, ...rest } = props;
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const items = useMemo(() => [
        { source: isHomeActivate ? HomeActivateIcon : HomeInactivateIcon, pageName: 'DiaryTimelinePage', name: '홈' },
        { source: DrawIcon, pageName: 'DiaryWritePage', name: '글쓰기' },
        { source: isPersonActivate ? PersonActivateIcon : PersonInactivateIcon, pageName: 'SettingPage', name: '마이' },
    ], [isHomeActivate, isPersonActivate]);
        
    return (
        <View style={S.styles.container}>
            {items.map((item, index) => (
                <FooterItem
                    key={index}
                    imageSource={item.source}
                    name={item.name}
                    onPress={() => navigation.navigate(item.pageName as never)}
                />
            ))}
        </View>
        
    );
}

interface FooterItemProps {
    imageSource: ImageSourcePropType;
    name: string;
    onPress: () => void;
}

const FooterItem = (props: FooterItemProps) => {
    const { imageSource, name, onPress, ...rest } = props;

    return (
        <TouchableOpacity style={S.styles.itemContainer} onPress={onPress}>
            <Image source={imageSource} style={S.styles.icon} />
            <Text style={S.styles.activeText}>{name}</Text>
        </TouchableOpacity>
    );
}

export default Footer;
