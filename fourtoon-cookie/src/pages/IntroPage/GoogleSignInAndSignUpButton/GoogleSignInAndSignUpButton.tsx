import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { Image, Text, TouchableOpacity } from 'react-native';
import { getGoogleIdTokenWithNativeLogin } from "../../../auth/googleOAuth";
import { OAuthProvider } from "../../../types/oauth";

import * as S from './GoogleSignInAndSignUpButton.styled';
import { useFunctionWithErrorHandling } from '../../../hooks/error';
import { useTranslationWithParentName } from '../../../hooks/locale';

export interface GoogleSignInAndSignUpButtonProps {
    onSuccess: (oauthProvider: OAuthProvider, idToken: string) => void;
}

const GoogleSignInAndSignUpButton = (props: GoogleSignInAndSignUpButtonProps) => {
    const { onSuccess, ...rest } = props;

    GoogleSignin.configure({
        scopes: [],
        webClientId: process.env.EXPO_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
        iosClientId: process.env.EXPO_PUBLIC_GOOGLE_OAUTH_IOS_CLIENT_ID
    });

    const { asyncFunctionWithErrorHandling } = useFunctionWithErrorHandling();

    const t = useTranslationWithParentName('pages.introPage.login');

    const handlePress = asyncFunctionWithErrorHandling(async () => {
        const idToken = await getGoogleIdTokenWithNativeLogin();
        if (!idToken) return;
        onSuccess(OAuthProvider.GOOGLE, idToken);
    });

    return (
        <TouchableOpacity style={S.styles.googleButton} onPress={handlePress}>
            <Image source={require('../../../../assets/icon/google.png')} style={S.styles.googleLogo} />
            <Text style={S.styles.googleButtonText}>{t("google")}</Text>
        </TouchableOpacity>
    )
}

export default GoogleSignInAndSignUpButton;