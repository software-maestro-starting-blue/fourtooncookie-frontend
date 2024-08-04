import { View, TouchableOpacity, Image, Text } from "react-native";
import * as S from './IntroPage.styled';
import GoogleSignInAndSignUpButton from "../../components/auth/GoogleSignInAndSignUpButton/GoogleSignInAndSignUpButton";
import type { JWTToken } from "../../types/jwt";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../constants/routing";
import { useContext, useEffect } from "react";
import GlobalJwtTokenStateContext from "../../components/global/GlobalJwtToken/GlobalJwtTokenStateContext";
import { supabaseRefreshToken } from "../../apis/supabase";
import type { Member } from "../../types/member";
import { getMember } from "../../apis/member";
import GlobalErrorInfoStateContext from "../../components/global/GlobalError/GlobalErrorInfoStateContext";
import { GlobalErrorInfoType } from "../../types/error";
import AppleSignInAndSignUpButton from "../../components/auth/AppleSignInAndSignUpButton/AppleSignInAndSignUpButton";

const IntroPage = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { jwtToken, setJwtToken } = useContext(GlobalJwtTokenStateContext);
    const { errorInfo, setErrorInfo } = useContext(GlobalErrorInfoStateContext);

    useEffect(() => {
        if (!jwtToken) return;

        const checkIsFirstTime = async () => {
            try {
                const member: Member = await getMember({jwtToken, setJwtToken});
                if (member.name == null) {
                    navigation.navigate('SignUpPage');
                } else {
                    navigation.navigate('DiaryTimelinePage');
                }
            } catch (e) {
                console.error('checkIsFirstTime : ', e);
                setErrorInfo({
                    type: GlobalErrorInfoType.MODAL,
                    message: '로그인 정보를 가져오는 중 오류가 발생했습니다.'
                });
                setJwtToken(null);
            }
        }

        checkIsFirstTime();
    }, [jwtToken, setJwtToken, navigation]);

    if (jwtToken) {
        return null;
    }

    const handleSignUpAndSignInSuccess = (token: JWTToken) => {
        setJwtToken(token);
    }

    return (
        <View style={S.styles.container}>
            <View style={S.styles.logoContainer}>
                <Image source={require('../../../assets/icon.png')} style={S.styles.logo} />
            </View>
            <Text style={S.styles.description}>나의 하루를 그림일기로 표현해보세요</Text>
            <View style={S.styles.buttons}>
                <View style={S.styles.buttonGoogle}>
                    <GoogleSignInAndSignUpButton onSuccess={handleSignUpAndSignInSuccess} />
                </View>
                <View style={S.styles.buttonApple}>
                    <AppleSignInAndSignUpButton onSuccess={handleSignUpAndSignInSuccess} />
                </View>
            </View>
        </View>
    );
}

export default IntroPage;