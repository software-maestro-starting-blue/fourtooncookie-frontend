import type { JWTToken } from "../types/jwt";
import { createClient } from '@supabase/supabase-js';
import { OAuthProvider } from "../types/oauth";
import { JwtError } from "../error/JwtError";

const supabase = createClient(process.env.EXPO_PUBLIC_SUPABASE_API_URL!, process.env.EXPO_PUBLIC_SUPABASE_API_KEY!);

export const supabaseSignInAndSignUpWithIdToken = async (provider: OAuthProvider, idToken: string, nonce?: string): Promise<JWTToken> => {
    try {
        const { data, error } = await supabase.auth.signInWithIdToken({
            provider: provider,
            token: idToken,
            nonce: nonce,
        });

        if (error || !data.session) {
            throw new JwtError("로그인 중 오류가 발생했습니다.");
        }

        return {
            accessToken: data.session.access_token,
            refreshToken: data.session.refresh_token,
            tokenType: data.session.token_type,
        };
    } catch (error) {
        throw new JwtError('로그인 중 오류가 발생했습니다.');
    }
};

export const supabaseRefreshToken = async (refreshToken: string): Promise<JWTToken> => {
    try {
        const { data, error } = await supabase.auth.refreshSession({ refresh_token: refreshToken });

        if (error || !data || !data.session) {
            throw new JwtError("로그인 갱신 중 오류가 발생했습니다.");
        }

        return {
            accessToken: data.session.access_token,
            refreshToken: data.session.refresh_token,
            tokenType: data.session.token_type,
        };
    } catch (error) {
        throw new JwtError("로그인 갱신 중 오류가 발생했습니다.");
    }
};
