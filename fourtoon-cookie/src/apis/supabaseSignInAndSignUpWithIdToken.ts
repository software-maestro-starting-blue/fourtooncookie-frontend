import {supabase} from "../utils/supabase";
import type {Session} from "../types/session";

export const supabaseSignInAndSignUpWithIdToken = async (provider: string, idToken: string): Promise<Session> => {
    try {
        const {data, error} = await supabase.auth.signInWithIdToken({
            provider: provider,
            token: idToken,
        })

        if (!data.session) {
            throw new Error("supabase 로그인 실패");
        }

        return {
            accessToken: data.session.access_token,
            refreshToken: data.session.refresh_token,
            tokenType: data.session.token_type,
            expires_at: data.session.expires_at,
            expires_in: data.session.expires_in,
        }
    } catch (error) {
        throw new Error('' + error);
    }
};