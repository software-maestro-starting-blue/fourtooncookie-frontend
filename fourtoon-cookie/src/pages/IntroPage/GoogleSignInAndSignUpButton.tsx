import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getGoogleIdTokenWithNativeLogin } from "../../auth/googleOAuth";
import { OAuthProvider } from "../../types/oauth";

import { useFunctionWithErrorHandling } from '../../hooks/error';
import { useTranslationWithParentName } from '../../hooks/locale';

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
        <TouchableOpacity style={styles.googleButton} onPress={handlePress}>
            <Image source={require('../../../../assets/icon/google.png')} style={styles.googleLogo} />
            <Text style={styles.googleButtonText}>{t("google")}</Text>
        </TouchableOpacity>
    )
}

export default GoogleSignInAndSignUpButton;

const styles = StyleSheet.create({
    googleButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 19,
        backgroundColor: '#F7F7F7',
        borderRadius: 16,
        marginBottom: 16,
      },
      googleLogo: {
        width: 24,
        height: 24,
        position: 'absolute',
        left: 18,
      },
      googleButtonText: {
        fontFamily: 'Pretendard',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 17,
        color: '#242424',
      },
})