import {GoogleSignin} from "@react-native-google-signin/google-signin";
import i18n from "../system/i18n";

export const getGoogleIdTokenWithNativeLogin = async (): Promise<string> => {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    if(userInfo.idToken) {
        return userInfo.idToken;
    }
    throw new Error(i18n.t("error.auth.google.failedToFindAccount"));
}