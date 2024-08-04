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

    throw new Error('not authenticated');
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
        throw new Error('unsupported appleAuth os');
    }

    const [idToken, nonce] = (Platform.OS === OS.IOS) ? await getAppleIdTokenInIOS() : await getAppleIdTokenInANDROID();
    if (idToken) {
        return [idToken, nonce];
    }
    throw new Error('Could not find user info');
}