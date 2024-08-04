import type {JWTToken} from "../types/jwt";
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_API_URL, SUPABASE_API_KEY } from '@env'
import {OAuthProvider} from "../types/oauth";
import { JwtError } from "../error/JwtError";

const supabase = createClient(SUPABASE_API_URL, SUPABASE_API_KEY);

export const supabaseSignInAndSignUpWithIdToken = async (provider: OAuthProvider, idToken: string, nonce?: string): Promise<JWTToken> => {
    try {
        const {data, error} = await supabase.auth.signInWithIdToken({
            provider: provider,
            token: idToken,
            nonce: nonce,
        })

        if (!data.session) {
            throw new JwtError("supabase 로그인 실패");
        }

        return {
            accessToken: data.session.access_token,
            refreshToken: data.session.refresh_token,
            tokenType: data.session.token_type,
        }
    } catch (error) {
        throw error;
    }
};

export const supabaseRefreshToken = async (refreshToken: string): Promise<JWTToken> => {
    try {
        const {data, error} = await supabase.auth.refreshSession({ refresh_token: refreshToken});

        if (!data) {
            throw new JwtError("토큰 갱신 실패");
        }

        if (!data.session) {
            throw new JwtError("토큰 갱신 실패");
        }

        return {
            accessToken: data.session.access_token,
            refreshToken: data.session.refresh_token,
            tokenType: data.session.token_type,
        }
    } catch (error) {
        throw new JwtError('' + error);
    }
}