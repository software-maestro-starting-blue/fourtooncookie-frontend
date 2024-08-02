import { GlobalJwtTokenStateContextProps } from "../components/global/GlobalJwtToken/GlobalJwtTokenStateContext";
import { JWTToken } from "../types/jwt";
import { supabaseRefreshToken } from "./supabase";


export const requestApi = async (url: string, method: string, jwtContext: GlobalJwtTokenStateContextProps, body?: any): Promise<Response> => {
    const { jwtToken, setJwtToken } = jwtContext;

    if (!jwtToken) {
        throw new Error('jwtToken is null');
    }

    if (!jwtToken.expires_at) {
        throw new Error('jwtToken.expires_at is null');
    }

    if (jwtToken.expires_at <= Date.now()) {
        try {
            setJwtToken(await supabaseRefreshToken(jwtToken.refreshToken));
        } catch (error) {
            throw new Error('jwtToken refresh error');
        }
    }

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken.accessToken}`
            },
            body: body ? JSON.stringify(body) : undefined,
        });

        if (response.status === 200) {
            return response;
        } else if (response.status === 401) {
            setJwtToken(await supabaseRefreshToken(jwtToken.refreshToken));
            return requestApi(url, method, jwtContext, body);
        } else {
            throw new Error(`[${method}] ${url} error`);
        }
    } catch (error) {
        console.error(`${method} : `, error);
        throw new Error(`${method} error`);
    }
}