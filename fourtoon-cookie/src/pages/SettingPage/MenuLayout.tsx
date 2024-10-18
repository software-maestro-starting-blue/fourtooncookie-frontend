import { View, Linking, Alert, StyleSheet } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import MenuWideButton from '../../components/common/MenuWideButton';
import { APP_INFO_URL } from '../../config/appinfo';
import { RootStackParamList } from '../../types/routing';

import { AccountStatus } from '../../types/account';
import { useAccountState } from '../../hooks/account';
import { useFunctionWithErrorHandling } from '../../hooks/error';
import { useTranslationWithParentName } from '../../hooks/locale';
import { showInfoToast } from '../../system/toast';

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
        showInfoToast(commonT('done'));
    });

    const handleResignButtonPress = functionWithErrorHandling(() => {
        const handleResign = asyncFunctionWithErrorHandling(async () => {
            await resign();
            showInfoToast(commonT('done'));
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
        <View style={styles.menuContainer}>
            <MenuWideButton menuText={commonT("appInfo")} onPress={handleAppInfoButtonPress} />
            {
                (accountState === AccountStatus.LOGINED) ? 
                (
                    <>
                    <MenuWideButton menuText={loginT("logout")} onPress={handleLogoutButtonPress} />
                    <MenuWideButton menuText={loginT("resign")} onPress={handleResignButtonPress} textStyle={styles.deleteText} />
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

const styles = StyleSheet.create({
    menuContainer: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 20,
      width: 350,
    },
    deleteText: {
      color: '#F60D0D',
  },
  });