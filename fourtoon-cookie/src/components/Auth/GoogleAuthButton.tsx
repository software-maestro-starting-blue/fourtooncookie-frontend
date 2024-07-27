import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin'
import { supabase } from './utils/supabase'
import { CLIENT_ID } from '@env'

const GoogleAuthButton = () => {
    GoogleSignin.configure({
        scopes: [],
        webClientId: CLIENT_ID,
    })

    return (
        <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={async () => {
                try {
                    await GoogleSignin.hasPlayServices()
                    const userInfo = await GoogleSignin.signIn()

                    if (userInfo.idToken) {
                        const { data, error } = await supabase.auth.signInWithIdToken({
                            provider: 'google',
                            token: userInfo.idToken,
                        })
                        //TODO: 토큰 사용
                    } else {
                        throw new Error('no ID token present!')
                    }
                } catch (error: any) {
                    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                        //TODO: 예외처리
                        // user cancelled the login flow
                    } else if (error.code === statusCodes.IN_PROGRESS) {
                        //TODO: 예외처리
                        // operation (e.g. sign in) is in progress already
                    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                        //TODO: 예외처리
                        // play services not available or outdated
                    } else {
                        //TODO: 예외처리
                        // some other error happened
                    }
                }
            }}
        />
    )
}

export default GoogleAuthButton;