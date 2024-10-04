import { View, Linking, Alert } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import MenuWideButton from '../../../components/common/MenuWideButton/MenuWideButton';
import { APP_INFO_URL } from '../../../config/appinfo';
import { RootStackParamList } from '../../../types/routing';

import * as S from './MenuLayout.styled';
import { AccountStatus } from '../../../types/account';
import { useAccountState } from '../../../hooks/account';
import { useFunctionWithErrorHandling } from '../../../hooks/error';

const MenuLayout = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { accountState, logout, resign } = useAccountState();

    const { functionWithErrorHandling, asyncFunctionWithErrorHandling } = useFunctionWithErrorHandling();

    const handleAppInfoButtonPress = asyncFunctionWithErrorHandling(async () => {
        Linking.openURL(APP_INFO_URL);
    });

    const handleLogoutButtonPress = asyncFunctionWithErrorHandling(async () => {
        await logout();
    });

    const handleResignButtonPress = functionWithErrorHandling(() => {
        const handleResign = asyncFunctionWithErrorHandling(async () => {
            await resign();
        });

        Alert.alert(
            '정말 탈퇴하시겠습니까?',
            '탈퇴하시면 그동안의 기록이 전부 삭제됩니다.',
            [
                {
                    text: '확인',
                    onPress: handleResign,
                    style: 'destructive'
                },
                {
                    text: '취소'
                }
            ]
        );
    })

    const handleLoginButtonPress = functionWithErrorHandling(() => {
        navigation.navigate('IntroPage');
    })
    
    return (
        <View style={S.styles.menuContainer}>
            <MenuWideButton menuText='앱 정보' onPress={handleAppInfoButtonPress} />
            {
                (accountState === AccountStatus.LOGINED) ? 
                (
                    <>
                    <MenuWideButton menuText='로그아웃' onPress={handleLogoutButtonPress} />
                    <MenuWideButton menuText='탈퇴하기' onPress={handleResignButtonPress} textStyle={S.styles.deleteText} />
                    </>
                ) : 
                (
                    <MenuWideButton menuText='로그인' onPress={handleLoginButtonPress} />
                )
            }
        </View>
    );
}

export default MenuLayout;