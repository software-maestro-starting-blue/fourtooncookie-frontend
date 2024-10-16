import type { JWTToken } from "../types/jwt";
import { createClient } from '@supabase/supabase-js';
import { OAuthProvider } from "../types/oauth";
import { JwtError } from "../types/error/JwtError";
import i18n from "../system/i18n";

const supabase = createClient(process.env.EXPO_PUBLIC_SUPABASE_API_URL!, process.env.EXPO_PUBLIC_SUPABASE_API_KEY!);

export const supabaseSignInAndSignUpWithIdToken = async (provider: OAuthProvider, idToken: string, nonce?: string): Promise<JWTToken> => {
    try {
        const { data, error } = await supabase.auth.signInWithIdToken({
            provider: provider,
            token: idToken,
            nonce: nonce,
        });

        if (error || !data.session) {
            throw new JwtError(i18n.t("error.auth.supabase.login"));
        }

        return {
            accessToken: data.session.access_token,
            refreshToken: data.session.refresh_token,
            tokenType: data.session.token_type,
        };
    } catch (error) {
        throw new JwtError(i18n.t("error.auth.supabase.login"));
    }
};

export const supabaseRefreshToken = async (refreshToken: string): Promise<JWTToken> => {
    try {
        const { data, error } = await supabase.auth.refreshSession({ refresh_token: refreshToken });

        if (error || !data || !data.session) {
            throw new JwtError(i18n.t("error.auth.supabase.refresh"));
        }

        return {
            accessToken: data.session.access_token,
            refreshToken: data.session.refresh_token,
            tokenType: data.session.token_type,
        };
    } catch (error) {
        throw new JwtError(i18n.t("error.auth.supabase.refresh"));
    }
};
