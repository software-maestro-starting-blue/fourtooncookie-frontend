import { GoogleSignin } from '@react-native-google-signin/google-signin'
import {supabaseSignInAndSignUpWithIdToken} from "../../../apis/supabase";
import type {JWTToken} from "../../../types/jwt";
import { OAuthProvider } from "../../../types/oauth";
import {getGoogleIdTokenWithNativeLogin} from "../../../apis/googleOAuth";
import { Image, Text, TouchableOpacity } from 'react-native';
import * as S from './GoogleSignInAndSignUpButton.styled';

export interface GoogleSignInAndSignUpButtonProps {
    onSuccess: (token: JWTToken) => void;
}

const GoogleSignInAndSignUpButton = (props: GoogleSignInAndSignUpButtonProps) => {
    const { onSuccess, ...rest } = props;

    GoogleSignin.configure({
        scopes: [],
        webClientId: process.env.EXPO_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
        iosClientId: process.env.EXPO_PUBLIC_GOOGLE_OAUTH_IOS_CLIENT_ID
    });

    const handlePress = async () => {
        console.log('GoogleSignInAndSignUpButton handlePress');
        try {
            const idToken = await getGoogleIdTokenWithNativeLogin();
            console.log('IdToken: ', idToken);
            if (idToken) {
                const token: JWTToken = await supabaseSignInAndSignUpWithIdToken(OAuthProvider.GOOGLE, idToken);
                onSuccess(token);
            }
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    return (
        <TouchableOpacity style={S.styles.googleButton} onPress={handlePress}>
            <Image source={require('../../../../assets/icon/google.png')} style={S.styles.googleLogo} />
            <Text style={S.styles.googleButtonText}>Google로 시작하기</Text>
        </TouchableOpacity>
    )
}

export default GoogleSignInAndSignUpButton;