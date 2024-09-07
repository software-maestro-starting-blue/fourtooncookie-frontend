import { View, TouchableOpacity, Image, Text } from "react-native";
import * as S from './IntroPage.styled';
import GoogleSignInAndSignUpButton from "./GoogleSignInAndSignUpButton/GoogleSignInAndSignUpButton";
import type { JWTToken } from "../../types/jwt";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../constants/routing";
import { useContext, useEffect } from "react";
import type { Member } from "../../types/member";
import { getMember } from "../../apis/member";
import { GlobalErrorInfoType } from "../../types/error";
import AppleSignInAndSignUpButton from "./AppleSignInAndSignUpButton/AppleSignInAndSignUpButton";
import { jwtManager } from "../../auth/jwt";
import { ApiError } from "../../error/ApiError";
import handleError from "../../error/errorhandler";

const IntroPage = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    
    const navigateByCheckingMemberExist = async () => {
        try {
            await getMember();
            navigation.navigate('DiaryTimelinePage');
        } catch (error) {
            if (error instanceof ApiError && error.getStatus() === 404) {
                navigation.navigate('SignUpPage');
                return;
            }
            
            if (error instanceof Error) {
                handleError(
                    error,
                    GlobalErrorInfoType.ALERT,
                    () => {
                        jwtManager.setToken(null);
                    }
                );
            }
        }
    }

    if (jwtManager.getToken()) {
        navigateByCheckingMemberExist();
        return null;
    }

    const handleSignUpAndSignInSuccess = async (token: JWTToken) => {
        await jwtManager.setToken(token);
        navigateByCheckingMemberExist();
    }

    return (
        <View style={S.styles.container}>
            <View style={S.styles.header}>
                <View style={S.styles.logoContainer}>
                    <Image source={require('../../../assets/logo/logo-5.png')} style={S.styles.logo} />
                </View>
                <Text style={S.styles.subtitle}>나의 하루를 그림일기로 표현해보세요</Text>
            </View>
            <View style={S.styles.buttonsContainer}>
                <GoogleSignInAndSignUpButton onSuccess={handleSignUpAndSignInSuccess} />
                <AppleSignInAndSignUpButton onSuccess={handleSignUpAndSignInSuccess} />
            </View>
        </View>
    );
}

export default IntroPage;