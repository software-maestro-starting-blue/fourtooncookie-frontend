import {
    GoogleSignin,
    GoogleSigninButton,
} from '@react-native-google-signin/google-signin'
import {CLIENT_ID} from '@env'
import {supabaseSignInAndSignUpWithIdToken} from "../../apis/supabaseSignInAndSignUpWithIdToken";
import type {Session} from "../../types/session";

const GoogleSignInAndSignUpButton = () => {
    GoogleSignin.configure({
        scopes: [],
        webClientId: CLIENT_ID,
    })

    const handleOnPress = async () => {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        if (userInfo.idToken) {
            const session: Session = await supabaseSignInAndSignUpWithIdToken('google', userInfo.idToken);
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