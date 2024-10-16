import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ReactNode, useMemo } from "react";
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslationWithParentName } from "../../hooks/locale";
import { RootStackParamList } from "../../types/routing";

import HomeInactivateIcon from '../../../assets/icon/home-inactivate.png';
import HomeActivateIcon from '../../../assets/icon/home-activate.png';
import DrawIcon from '../../../assets/icon/draw.png';
import PersonInactivateIcon from '../../../assets/icon/person-inactivate.png';
import PersonActivateIcon from '../../../assets/icon/person-activate.png';

export interface MainPageLayoutProps {
    children: ReactNode,
    footerState: FOOTER_STATE,
}

const MainPageLayout = (props: MainPageLayoutProps) => {
    const { children, footerState, ...rest } = props;

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.childrenContainer}>
                { children }
            </SafeAreaView>
            <Footer footerState={footerState} />
        </View>
    );

}

export enum FOOTER_STATE {
    HOME, WRITE, SETTING
}

export interface FooterProps {
    footerState: FOOTER_STATE;
}

const Footer = (props: FooterProps) => {
    const { footerState, ...rest } = props;
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const t = useTranslationWithParentName('components.footer');

    const items = useMemo(() => [
        { source: footerState === FOOTER_STATE.HOME ? HomeActivateIcon : HomeInactivateIcon, pageName: 'DiaryTimelinePage', name: t("home") },
        { source: DrawIcon, pageName: 'DiaryWritePage', name: t("write") },
        { source: footerState === FOOTER_STATE.SETTING ? PersonActivateIcon : PersonInactivateIcon, pageName: 'SettingPage', name: t("setting") },
    ], [footerState]);
        
    return (
        <View style={footerStyles.container}>
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
        <TouchableOpacity style={footerStyles.itemContainer} onPress={onPress}>
            <Image source={imageSource} style={footerStyles.icon} />
            <Text style={footerStyles.activeText}>{name}</Text>
        </TouchableOpacity>
    );
}

export default MainPageLayout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    childrenContainer: {
        position: 'relative',
        flexGrow: 1,
        height: "89%",
        padding: 10,
    }
});

const footerStyles = StyleSheet.create({
    container: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        left: 0,
        right: 0,
        bottom: 0,
        padding: 0,
        width: "100%",
        height: "11%",
        backgroundColor: "#FFFFFF"
    },
    itemContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginBottom: 20,
        gap: 4,
        width: "33%",
        height: "100%",
    },
    icon: {
        width: 24,
        height: 24,
    },
    activeText: {
        width: 72,
        height: 12,
        fontFamily: 'Pretendard',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 10,
        lineHeight: 12,
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        color: '#212121',
    },
});
