import {
    GoogleSignin,
    GoogleSigninButton,
} from '@react-native-google-signin/google-signin'
import {CLIENT_ID} from '@env'
import {supabaseSignInAndSignUpWithIdToken} from "../../apis/supabaseSignInAndSignUpWithIdToken";
import type {Session} from "../../types/session";
import {OAuthProvider} from "../../types/OAuthProvider";

const GoogleSignInAndSignUpButton = () => {
    GoogleSignin.configure({
        scopes: [],
        webClientId: CLIENT_ID,
    })

    const handleOnPress = async () => {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        if (userInfo.idToken) {
            const session: Session = await supabaseSignInAndSignUpWithIdToken(OAuthProvider.GOOGLE, userInfo.idToken);
            console.log(session)
        }
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