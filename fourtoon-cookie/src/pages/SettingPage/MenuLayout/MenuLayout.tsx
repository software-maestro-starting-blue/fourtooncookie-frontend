import { View, Text, TouchableOpacity, Image, Linking } from 'react-native';
import * as S from './MenuLayout.styled';
import MenuItem from './MenuItem/MenuItem';
import { INQRUITY_PAGE_URL } from '../../../constants/constants';
import { useContext } from 'react';
import GlobalErrorInfoStateContext from '../../../components/global/GlobalError/GlobalErrorInfoStateContext';
import { GlobalErrorInfoType } from '../../../types/error';
import GlobalJwtTokenStateContext from '../../../components/global/GlobalJwtToken/GlobalJwtTokenStateContext';

const MenuLayout = () => {
    const { errorInfo, setErrorInfo } = useContext(GlobalErrorInfoStateContext);
    const { jwtToken, setJwtToken } = useContext(GlobalJwtTokenStateContext);

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

    const handleResign = () => {
        //TODO: 회원 탈퇴 로직 구현
    }
    
    return (
        <View style={S.styles.menuContainer}>
            <MenuItem menuText='문의하기' onPress={handleInquiry} />
            <MenuItem menuText='로그아웃' onPress={handleLogout} />
            <MenuItem menuText='탈퇴하기' onPress={handleResign} textStyle={S.styles.deleteText} />
      </View>
    );
}

export default MenuLayout;