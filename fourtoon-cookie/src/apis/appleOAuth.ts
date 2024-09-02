import {Platform} from "react-native";
import {appleAuth, appleAuthAndroid} from "@invertase/react-native-apple-authentication";
import 'react-native-get-random-values';
import {v4 as uuid} from "uuid";
import {OS} from "../types/os";
import {APPLE_OAUTH_SERVICE_ID, APPLE_OAUTH_REDIRECT_URL} from '@env'

const getAppleIdTokenInIOS = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

    if (credentialState === appleAuth.State.AUTHORIZED && appleAuthRequestResponse.identityToken) {
        return [appleAuthRequestResponse.identityToken, appleAuthRequestResponse.nonce];
    }

    throw new Error('인증할 수 없습니다. 다시 로그인해 주세요.');
}

const getAppleIdTokenInANDROID = async () => {
    const rawNonce = uuid();
    const state = uuid();

    appleAuthAndroid.configure({
        clientId: APPLE_OAUTH_SERVICE_ID,
        redirectUri: APPLE_OAUTH_REDIRECT_URL,
        responseType: appleAuthAndroid.ResponseType.ALL,
        scope: appleAuthAndroid.Scope.ALL,
        nonce: rawNonce,
        state,
    });

    const response = await appleAuthAndroid.signIn();

    return [response.id_token, rawNonce];
}

export const getAppleIdToken = async (): Promise<[string, string | undefined]> => {
    if (Platform.OS != OS.IOS && Platform.OS != OS.ANDROID) {
        throw new Error('해당 운영체제는 지원하지 않습니다. IOS 또는 ANDROID로 시도해 주십시오.');
    }

    const [idToken, nonce] = (Platform.OS === OS.IOS) ? await getAppleIdTokenInIOS() : await getAppleIdTokenInANDROID();
    if (idToken) {
        return [idToken, nonce];
    }
    throw new Error('사용자 애플 정보를 찾을 수 없습니다.');
}