import { View, TouchableOpacity, Image, Text } from "react-native";
import * as S from './IntroPage.styled';
import GoogleSignInAndSignUpButton from "../../components/auth/GoogleSignInAndSignUpButton/GoogleSignInAndSignUpButton";
import { JWTToken } from "../../types/jwt";

const IntroPage = () => {

    const handleSignInButtonPress = (token: JWTToken) => {

    }

    return (
        <View style={S.styles.container}>
            <View style={S.styles.logoContainer}>
                <Image source={require('./assets/image.png')} style={S.styles.logo} />
            </View>
            <Text style={S.styles.description}>나의 하루를 그림일기로 표현해보세요</Text>
            <View style={S.styles.buttons}>
                <View style={S.styles.buttonGoogle}>
                    <GoogleSignInAndSignUpButton onPress={handleSignInButtonPress} />
                </View>
                <View style={S.styles.buttonApple}>
                    
                </View>
            </View>
        </View>
    );
}

export default IntroPage;