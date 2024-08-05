import { View, Text, TouchableOpacity, Image } from 'react-native';
import CHEVRON_RIGHT from '../../../../assets/icon/chevron-right.png';
import * as S from './MenuLayout.styled';

const MenuLayout = () => {
    const handleInquiry = () => {
        //TODO: 문의하기 로직 구현
    }

    const handleLogout = () => {
        //TODO: 탈퇴 로직 구현
    }
    
    return (
        <View style={S.styles.menuContainer}>
            <TouchableOpacity style={S.styles.menuItem}>
                <Text style={S.styles.menuText}>문의하기</Text>
                <Image source={CHEVRON_RIGHT} style={S.styles.chevronRight} />
            </TouchableOpacity>

            <TouchableOpacity style={S.styles.menuItem}>
                <Text style={S.styles.menuText}>로그아웃</Text>
                <Image source={CHEVRON_RIGHT} style={S.styles.chevronRight} />
            </TouchableOpacity>

            <TouchableOpacity style={S.styles.menuItem}>
                <Text style={[S.styles.menuText, S.styles.deleteText]}>탈퇴하기</Text>
                <Image source={CHEVRON_RIGHT} style={S.styles.chevronRight} />
            </TouchableOpacity>
      </View>
    );
}

export default MenuLayout;