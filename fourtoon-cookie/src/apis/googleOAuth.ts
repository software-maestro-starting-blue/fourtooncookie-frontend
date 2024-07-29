import {GoogleSignin} from "@react-native-google-signin/google-signin";

export const getGoogleIdTokenWithNativeLogin = async (): Promise<string> => {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    if(userInfo.idToken) {
        return userInfo.idToken;
    }
    throw new Error('Could not find user info');
}