import { View, Image, Text } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { supabaseSignInAndSignUpWithIdToken } from "../../auth/supabase";
import { RootStackParamList } from "../../types/routing";
import { OAuthProvider } from "../../types/oauth";
import type { JWTToken } from "../../types/jwt";

import AppleSignInAndSignUpButton from "./AppleSignInAndSignUpButton/AppleSignInAndSignUpButton";
import GoogleSignInAndSignUpButton from "./GoogleSignInAndSignUpButton/GoogleSignInAndSignUpButton";
import * as S from './IntroPage.styled';
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
        <View style={S.styles.container}>
            <View style={S.styles.header}>
                <View style={S.styles.logoContainer}>
                    <Image source={require('../../../assets/logo/logo-5.png')} style={S.styles.logo} />
                </View>
                <Text style={S.styles.subtitle}>{t("subtitle")}</Text>
            </View>
            <View style={S.styles.buttonsContainer}>
                <GoogleSignInAndSignUpButton onSuccess={handleSignUpAndSignInSuccess} />
                <AppleSignInAndSignUpButton onSuccess={handleSignUpAndSignInSuccess} />
            </View>
        </View>
    );
}

export default IntroPage;