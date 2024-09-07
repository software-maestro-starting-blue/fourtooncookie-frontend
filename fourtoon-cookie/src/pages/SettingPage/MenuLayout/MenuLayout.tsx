import { View, Linking } from 'react-native';
import MenuItem from './MenuItem/MenuItem';
import { INQRUITY_PAGE_URL } from '../../../constants/constants';
import { useContext, useState } from 'react';
import { GlobalErrorInfoType } from '../../../types/error';
import ResignModal from './ResignModal/ResignModal';
import * as S from './MenuLayout.styled';
import { jwtManager } from '../../../auth/jwt';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../constants/routing';
import handleError from '../../../error/errorhandler';

const MenuLayout = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [ isModalVisible, setIsModalVisible ] = useState(false);

    const handleInquiry = () => {
        Linking.openURL(INQRUITY_PAGE_URL).catch(err => 
            handleError(
                new Error('문의 페이지를 열 수 없습니다.'),
                GlobalErrorInfoType.MODAL
            )
        );
    }

    const handleLogout = async () => {
        await jwtManager.setToken(null);
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
            <MenuItem menuText='문의하기' onPress={handleInquiry} />
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