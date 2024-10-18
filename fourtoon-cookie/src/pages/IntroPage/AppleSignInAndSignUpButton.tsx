import React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { appleAuthAndroid } from '@invertase/react-native-apple-authentication';
import { getAppleIdToken } from "../../auth/appleOAuth";
import { OAuthProvider } from "../../types/oauth";
import { OS } from "../../types/os";

import { useFunctionWithErrorHandling } from '../../hooks/error';
import { useTranslationWithParentName } from '../../hooks/locale';

export interface AppleSignInAndSignUpButtonProps {
    onSuccess: (oauthProvider: OAuthProvider, idToken: string, nonce?: string) => void;
}

const AppleSignInAndSignUpButton = (props: AppleSignInAndSignUpButtonProps) => {
    const {onSuccess, ...rest} = props;

    const { asyncFunctionWithErrorHandling } = useFunctionWithErrorHandling();

    const t = useTranslationWithParentName('pages.introPage.login');

    const handlePress = asyncFunctionWithErrorHandling(async () => {
        const [idToken, nonce] = await getAppleIdToken();
        if (!idToken) return;
        onSuccess(OAuthProvider.APPLE, idToken, nonce);
    });

    return (Platform.OS === OS.IOS || appleAuthAndroid.isSupported) && (
        <TouchableOpacity style={styles.appleButton} onPress={handlePress}>
            <Image source={require('../../../assets/icon/apple.png')} style={styles.appleLogo} />
            <Text style={styles.appleButtonText}>{t("apple")}</Text>
        </TouchableOpacity>
            );
}

export default AppleSignInAndSignUpButton;

const styles = StyleSheet.create({
    appleButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 19,
        backgroundColor: '#000000',
        borderRadius: 16,
      },
      appleLogo: {
        width: 24,
        height: 24,
        position: 'absolute',
        left: 18,
      },
      appleButtonText: {
        fontFamily: 'Pretendard',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 17,
        color: '#FFFFFF',
      },
})