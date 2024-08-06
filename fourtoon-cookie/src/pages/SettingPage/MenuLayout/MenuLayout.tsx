import { View, Text, TouchableOpacity, Image } from 'react-native';
import * as S from './MenuLayout.styled';
import MenuItem from './MenuItem/MenuItem';

const MenuLayout = () => {
    const handleInquiry = () => {
        //TODO: 문의하기 로직 구현
    }

    const handleLogout = () => {
        //TODO: 로그아웃 로직 구현
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