import {
    GoogleSignin,
    GoogleSigninButton,
} from '@react-native-google-signin/google-signin'
import {CLIENT_ID} from '@env'
import {supabaseSignInAndSignUpWithIdToken} from "../../apis/supabase";
import type {Session} from "../../types/session";
import { OAuthProvider } from "../../types/OAuthProvider";
import {getGoogleIdTokenWithNativeLogin} from "../../apis/googleOAuth";

const GoogleSignInAndSignUpButton = () => {
    GoogleSignin.configure({
        scopes: [],
        webClientId: CLIENT_ID,
    })

    const handleOnPress = async () => {
        const idToken = await getGoogleIdTokenWithNativeLogin();
        if (idToken) {
            const session: Session = await supabaseSignInAndSignUpWithIdToken(OAuthProvider.GOOGLE, idToken);
        }
        throw new Error('로그인 실패')
    }

    return (
        <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={handleOnPress}
        />
    )
}

export default GoogleSignInAndSignUpButton;