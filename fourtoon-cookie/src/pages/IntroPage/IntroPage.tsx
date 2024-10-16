import { View, Image, Text, StyleSheet } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { supabaseSignInAndSignUpWithIdToken } from "../../auth/supabase";
import { RootStackParamList } from "../../types/routing";
import { OAuthProvider } from "../../types/oauth";
import type { JWTToken } from "../../types/jwt";

import AppleSignInAndSignUpButton from "./AppleSignInAndSignUpButton";
import GoogleSignInAndSignUpButton from "./GoogleSignInAndSignUpButton";
import { AccountStatus } from "../../types/account";
import { useAccountState } from "../../hooks/account";
import { useEffectWithErrorHandling, useFunctionWithErrorHandling } from "../../hooks/error";
import { useTranslationWithParentName } from "../../hooks/locale";

const IntroPage = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const { accountState, login } = useAccountState();

    const { asyncFunctionWithErrorHandling } = useFunctionWithErrorHandling();

    const t = useTranslationWithParentName('pages.introPage');

    useEffectWithErrorHandling(() => {
        const navigateByMemberStatus = async () => {
			if (accountState === AccountStatus.UNAUTHORIZED) {
				return;
			}
	
			if (accountState == AccountStatus.UNSIGNEDUP){
				navigation.navigate('SignUpPage');
				return;
			}
	
			navigation.navigate('DiaryTimelinePage');
		}
		
		navigateByMemberStatus();
    }, [accountState]);

    const handleSignUpAndSignInSuccess = asyncFunctionWithErrorHandling(async (oauthProvider: OAuthProvider, idToken: string, nonce?: string) => {
        const token: JWTToken = await supabaseSignInAndSignUpWithIdToken(oauthProvider, idToken, nonce);
        await login(token);
    });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Image source={require('../../../assets/logo/logo-5.png')} style={styles.logo} />
                </View>
                <Text style={styles.subtitle}>{t("subtitle")}</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <GoogleSignInAndSignUpButton onSuccess={handleSignUpAndSignInSuccess} />
                <AppleSignInAndSignUpButton onSuccess={handleSignUpAndSignInSuccess} />
            </View>
        </View>
    );
}

export default IntroPage;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    header: {
      flex: 0.9,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoContainer: {
      width: 200,
      height: 150,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    subtitle: {
      fontFamily: 'Pretendard',
      fontWeight: '500',
      fontSize: 14,
      lineHeight: 20,
      color: '#AAAAAA',
      marginTop: 8,
    },
    buttonsContainer: {
      position: 'absolute',
      bottom: 60,
      left: 20,
      right: 20,
    },
    });