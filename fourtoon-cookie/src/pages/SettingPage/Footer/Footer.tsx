import { View, Text, TouchableOpacity } from 'react-native';
import * as S from './Footer.styled';

const Footer = () => {
    const handleInquiry = () => {
        //TODO: 문의하기 로직 구현
    }

    const handleLogout = () => {
        //TODO: 탈퇴 로직 구현
    }
    
    return (
        <View style={S.styles.footer}>
            <TouchableOpacity onPress={handleInquiry}>
                <Text style={S.styles.inquiryText}>문의하기</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}>
                <Text style={S.styles.logoutText}>탈퇴하기</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Footer;