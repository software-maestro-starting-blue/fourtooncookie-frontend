import { View, Linking, Alert } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import MenuWideButton from '../../../components/common/MenuWideButton/MenuWideButton';
import { APP_INFO_URL } from '../../../config/appinfo';
import { RootStackParamList } from '../../../types/routing';

import * as S from './MenuLayout.styled';
import { AccountStatus } from '../../../types/account';
import { useAccountState } from '../../../hooks/account';
import { useFunctionWithErrorHandling } from '../../../hooks/error';
import { useTranslationWithParentName } from '../../../hooks/locale';

const MenuLayout = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { accountState, logout, resign } = useAccountState();

    const { functionWithErrorHandling, asyncFunctionWithErrorHandling } = useFunctionWithErrorHandling();

    const commonT = useTranslationWithParentName('common');
    const loginT = useTranslationWithParentName('login');

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
            loginT('resignAskTitle'),
            loginT('resignAskDetail'),
            [
                {
                    text: commonT('confirm'),
                    onPress: handleResign,
                    style: 'destructive'
                },
                {
                    text: commonT('cancel'),
                }
            ]
        );
    })

    const handleLoginButtonPress = functionWithErrorHandling(() => {
        navigation.navigate('IntroPage');
    })
    
    return (
        <View style={S.styles.menuContainer}>
            <MenuWideButton menuText={commonT("appInfo")} onPress={handleAppInfoButtonPress} />
            {
                (accountState === AccountStatus.LOGINED) ? 
                (
                    <>
                    <MenuWideButton menuText={loginT("logout")} onPress={handleLogoutButtonPress} />
                    <MenuWideButton menuText={loginT("resign")} onPress={handleResignButtonPress} textStyle={S.styles.deleteText} />
                    </>
                ) : 
                (
                    <MenuWideButton menuText={loginT("login")} onPress={handleLoginButtonPress} />
                )
            }
        </View>
    );
}

export default MenuLayout;