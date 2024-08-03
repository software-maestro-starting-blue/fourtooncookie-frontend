import React from 'react';
import {Platform, View} from 'react-native';
import {appleAuthAndroid, AppleButton} from '@invertase/react-native-apple-authentication';
import {getAppleIdToken} from "../../../apis/appleOAuth";
import {supabaseSignInAndSignUpWithIdToken} from "../../../apis/supabase";
import {OAuthProvider} from "../../../types/oauth";
import type {JWTToken} from "../../../types/jwt";

export interface AppleSignInAndSignUpButtonProps {
    onPress: (token: JWTToken) => void;
}

const AppleSignAndSignUpButton = (props: AppleSignInAndSignUpButtonProps) => {
    const {onPress, ...rest} = props;

    const handlePress = async () => {
        const [idToken, nonce] = await getAppleIdToken();
        if (idToken) {
            const token = await supabaseSignInAndSignUpWithIdToken(OAuthProvider.APPLE, idToken, nonce);
            onPress(token);
        }
        // TODO: 다른 방식으로 에러 핸들링
    }

    return (
        <View>
            {(Platform.OS === 'ios' || appleAuthAndroid.isSupported) && (
                <AppleButton
                    buttonStyle={AppleButton.Style.WHITE}
                    buttonType={AppleButton.Type.SIGN_IN}
                    style={{
                        width: 160, // You must specify a width
                        height: 45, // You must specify a height
                    }}
                    onPress={handlePress}
                />
            )}
        </View>
    );
}

export default AppleSignAndSignUpButton;