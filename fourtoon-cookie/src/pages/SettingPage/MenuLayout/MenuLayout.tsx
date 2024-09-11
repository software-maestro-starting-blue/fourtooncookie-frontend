import { View, Linking } from 'react-native';
import MenuItem from './MenuItem/MenuItem';
import { useContext, useState } from 'react';
import { GlobalErrorInfoType } from '../../../types/error';
import ResignModal from './ResignModal/ResignModal';
import * as S from './MenuLayout.styled';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../constants/routing';
import handleError from '../../../error/errorhandler';
import { APP_INFO_URL } from '../../../constants/appinfo';
import { useMemberStore } from '../../../store/member';

const MenuLayout = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { logoutMember } = useMemberStore();
    const [ isModalVisible, setIsModalVisible ] = useState(false);

    const handleInquiry = () => {
        Linking.openURL(APP_INFO_URL).catch(err => 
            handleError(
                new Error('앱 정보 페이지를 열 수 없습니다.'),
                GlobalErrorInfoType.ALERT
            )
        );
    }

    const handleLogout = async () => {
        logoutMember();
        navigation.navigate('IntroPage');
    }

    const handleResignButtonPress = () => {
        setIsModalVisible(true);
    }

    const handleResignModelClose = () => {
        setIsModalVisible(false);
    }
    
    return (
        <View style={S.styles.menuContainer}>
            <MenuItem menuText='앱 정보' onPress={handleInquiry} />
            <MenuItem menuText='로그아웃' onPress={handleLogout} />
            <MenuItem menuText='탈퇴하기' onPress={handleResignButtonPress} textStyle={S.styles.deleteText} />
            <ResignModal
                visible={isModalVisible}
                onClose={handleResignModelClose}
            />
        </View>
    );
}

export default MenuLayout;