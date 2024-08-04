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

const IntroPage = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { jwtToken, setJwtToken } = useContext(GlobalJwtTokenStateContext);
    const { errorInfo, setErrorInfo } = useContext(GlobalErrorInfoStateContext);

    useEffect(() => {
        if (!jwtToken) return;

        if (!jwtToken.expires_at || jwtToken.expires_at < Date.now()) {
            const refreshAccessToken = async () => {
                try {
                    const newToken = await supabaseRefreshToken(jwtToken.refreshToken);
                    setJwtToken(newToken);
                } catch (e) {
                    setJwtToken(null);
                    setErrorInfo({
                        type: GlobalErrorInfoType.MODAL,
                        message: '로그인 정보가 만료되었습니다. 다시 로그인해주세요.'
                    });
                }
            }

            refreshAccessToken();
            return;
        }

        const checkIsFirstTime = async () => {
            const member: Member = await getMember({jwtToken, setJwtToken});
            if (member.name == null) {
                navigation.navigate('SignUpPage');
            } else {
                navigation.navigate('DiaryTimelinePage');
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
                    
                </View>
            </View>
        </View>
    );
}

export default IntroPage;