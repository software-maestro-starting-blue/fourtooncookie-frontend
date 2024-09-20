import React from 'react';
import { Image, Platform, Text, TouchableOpacity } from 'react-native';
import { appleAuthAndroid } from '@invertase/react-native-apple-authentication';
import { getAppleIdToken } from "../../../auth/appleOAuth";
import { OAuthProvider } from "../../../types/oauth";
import { OS } from "../../../types/os";

import * as S from "./AppleSignInAndSignUpButton.styled";

export interface AppleSignInAndSignUpButtonProps {
    onSuccess: (oauthProvider: OAuthProvider, idToken: string, nonce?: string) => void;
}

const AppleSignInAndSignUpButton = (props: AppleSignInAndSignUpButtonProps) => {
    const {onSuccess, ...rest} = props;

    const handlePress = async () => {
        const [idToken, nonce] = await getAppleIdToken();
        if (!idToken) return;
        onSuccess(OAuthProvider.APPLE, idToken, nonce);
    }

    return (Platform.OS === OS.IOS || appleAuthAndroid.isSupported) && (
        <TouchableOpacity style={S.styles.appleButton} onPress={handlePress}>
            <Image source={require('../../../../assets/icon/apple.png')} style={S.styles.appleLogo} />
            <Text style={S.styles.appleButtonText}>Apple로 시작하기</Text>
        </TouchableOpacity>
            );
}

export default AppleSignInAndSignUpButton;