import { View, Linking } from 'react-native';
import MenuItem from './MenuItem/MenuItem';
import { INQRUITY_PAGE_URL } from '../../../constants/constants';
import { useContext, useState } from 'react';
import GlobalErrorInfoStateContext from '../../../components/global/GlobalError/GlobalErrorInfoStateContext';
import { GlobalErrorInfoType } from '../../../types/error';
import GlobalJwtTokenStateContext from '../../../components/global/GlobalJwtToken/GlobalJwtTokenStateContext';
import ResignModal from './ResignModal/ResignModal';
import * as S from './MenuLayout.styled';

const MenuLayout = () => {
    const { errorInfo, setErrorInfo } = useContext(GlobalErrorInfoStateContext);
    const { jwtToken, setJwtToken } = useContext(GlobalJwtTokenStateContext);
    const [ isModalVisible, setIsModalVisible ] = useState(false);

    const handleInquiry = () => {
        Linking.openURL(INQRUITY_PAGE_URL).catch(err => 
            setErrorInfo({
                type: GlobalErrorInfoType.MODAL,
                error: new Error("문의 페이지로 이동하는데 실패했습니다."),
            })
        );
    }

    const handleLogout = () => {
        setJwtToken(null);
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