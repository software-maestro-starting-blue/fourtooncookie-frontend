import { View, Image, Text } from "react-native";
import * as S from './IntroPage.styled';
import GoogleSignInAndSignUpButton from "./GoogleSignInAndSignUpButton/GoogleSignInAndSignUpButton";
import type { JWTToken } from "../../types/jwt";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../constants/routing";
import { useEffect, useState } from "react";
import AppleSignInAndSignUpButton from "./AppleSignInAndSignUpButton/AppleSignInAndSignUpButton";
import { useJWTStore } from "../../store/jwt";
import { useMemberStore } from "../../store/member";
import { OAuthProvider } from "../../types/oauth";
import { supabaseSignInAndSignUpWithIdToken } from "../../auth/supabase";

const IntroPage = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const { jwt, setJWT } = useJWTStore();
    const { reloadMember } = useMemberStore();

    const handleSignUpAndSignInSuccess = async (oauthProvider: OAuthProvider, idToken: string, nonce?: string) => {
        const token: JWTToken = await supabaseSignInAndSignUpWithIdToken(oauthProvider, idToken, nonce);
        await setJWT(token);
        await reloadMember();
    }

    return (
        <View style={S.styles.container}>
            <View style={S.styles.header}>
                <View style={S.styles.logoContainer}>
                    <Image source={require('../../../assets/logo/logo-5.png')} style={S.styles.logo} />
                </View>
                <Text style={S.styles.subtitle}>나의 하루를 그림일기로 표현해보세요</Text>
            </View>
            { !jwt && <View style={S.styles.buttonsContainer}>
                <GoogleSignInAndSignUpButton onSuccess={handleSignUpAndSignInSuccess} />
                <AppleSignInAndSignUpButton onSuccess={handleSignUpAndSignInSuccess} />
            </View> }
        </View>
    );
}

export default IntroPage;