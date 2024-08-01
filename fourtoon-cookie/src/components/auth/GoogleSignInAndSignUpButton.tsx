import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin'
import {CLIENT_ID} from '@env'
import {supabaseSignInAndSignUpWithIdToken} from "../../apis/supabase";
import type {JWTToken} from "../../types/jwt";
import { OAuthProvider } from "../../types/oauth";
import {getGoogleIdTokenWithNativeLogin} from "../../apis/googleOAuth";

export interface GoogleSignInAndSignUpButtonProps {
    onPress: (token: JWTToken) => void;
}


const GoogleSignInAndSignUpButton = (props: GoogleSignInAndSignUpButtonProps) => {
    const { onPress, ...rest } = props;

    GoogleSignin.configure({
        scopes: [],
        webClientId: CLIENT_ID,
    })

    const handlePress = async () => {
        const idToken = await getGoogleIdTokenWithNativeLogin();
        if (idToken) {
            const token: JWTToken = await supabaseSignInAndSignUpWithIdToken(OAuthProvider.GOOGLE, idToken);
            onPress(token);
        }
        // TODO: 다른 방식으로 에러 핸들링
    }

    return (
        <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={handlePress}
        />
    )
}

export default GoogleSignInAndSignUpButton;