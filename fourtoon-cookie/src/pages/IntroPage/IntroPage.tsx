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

const IntroPage = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const { jwt, setJWT } = useJWTStore();
    const { member } = useMemberStore();

    
    const navigateByCheckingMemberExist = async () => {
        if (member){
            navigation.navigate('DiaryTimelinePage');
            return;
        }

        if (jwt) {
            navigation.navigate('SignUpPage');
            return;
        }
    }

    useEffect(() => {
        navigateByCheckingMemberExist();
    }, [jwt, member]);

    const handleSignUpAndSignInSuccess = async (token: JWTToken) => {
        setJWT(token);
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