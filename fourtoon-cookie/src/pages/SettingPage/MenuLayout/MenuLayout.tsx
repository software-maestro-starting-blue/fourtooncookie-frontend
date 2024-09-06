import { View, Linking } from 'react-native';
import MenuItem from './MenuItem/MenuItem';
import { INQRUITY_PAGE_URL } from '../../../constants/constants';
import { useContext, useState } from 'react';
import GlobalErrorInfoStateContext from '../../../components/global/GlobalError/GlobalErrorInfoStateContext';
import { GlobalErrorInfoType } from '../../../types/error';
import ResignModal from './ResignModal/ResignModal';
import * as S from './MenuLayout.styled';
import { jwtManager } from '../../../apis/jwt';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../constants/routing';

const MenuLayout = () => {
    const { errorInfo, setErrorInfo } = useContext(GlobalErrorInfoStateContext);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [ isModalVisible, setIsModalVisible ] = useState(false);

    const handleInquiry = () => {
        Linking.openURL(INQRUITY_PAGE_URL).catch(err => 
            setErrorInfo({
                type: GlobalErrorInfoType.MODAL,
                error: new Error("문의 페이지로 이동하는데 실패했습니다."),
            })
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