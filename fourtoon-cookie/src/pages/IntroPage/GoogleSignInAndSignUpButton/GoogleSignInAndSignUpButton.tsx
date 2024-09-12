import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { OAuthProvider } from "../../../types/oauth";
import {getGoogleIdTokenWithNativeLogin} from "../../../auth/googleOAuth";
import { Image, Text, TouchableOpacity } from 'react-native';
import * as S from './GoogleSignInAndSignUpButton.styled';

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

    const handlePress = async () => {
        const idToken = await getGoogleIdTokenWithNativeLogin();
        if (!idToken) return;
        onSuccess(OAuthProvider.GOOGLE, idToken);
    }

    return (
        <TouchableOpacity style={S.styles.googleButton} onPress={handlePress}>
            <Image source={require('../../../../assets/icon/google.png')} style={S.styles.googleLogo} />
            <Text style={S.styles.googleButtonText}>Google로 시작하기</Text>
        </TouchableOpacity>
    )
}

export default GoogleSignInAndSignUpButton;