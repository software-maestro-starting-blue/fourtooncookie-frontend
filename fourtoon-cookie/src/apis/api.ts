import { API_URL } from "@env";
import { GlobalJwtTokenStateContextProps } from "../components/global/GlobalJwtToken/GlobalJwtTokenStateContext";
import type { JWTToken } from "../types/jwt";
import { supabaseRefreshToken } from "./supabase";
import { JwtError } from "../error/JwtError";
import { ApiError } from "../error/ApiError";


export const requestApi = async (url: string, method: string, jwtContext: GlobalJwtTokenStateContextProps, body?: any): Promise<Response> => {
    const { jwtToken, setJwtToken } = jwtContext;

    if (!jwtToken) {
        throw new JwtError('jwtToken is null');
    }

    const refreshJwtToken = async () => {
        try {
            const newToken = await supabaseRefreshToken(jwtToken.refreshToken);
            setJwtToken(newToken);
            return newToken;
        } catch (error) {
            setJwtToken(null);
            throw new JwtError('jwtToken refresh error');
        }
    };

    const makeRequest = async (token: JWTToken, isRetry: boolean = false) => {
        try {
            const response = await fetch(API_URL + url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.accessToken}`
                },
                body: body ? JSON.stringify(body) : undefined,
            });

            if (response.status <= 299) {
                return response;
            } else if (response.status === 401) {
                if (! isRetry) {
                    const newToken = await refreshJwtToken();
                    return makeRequest(newToken, true);
                } else {
                    throw new JwtError(`[${method}] ${url} refresh error`);
                }
            } else {
                throw new ApiError(`[${method}] ${url} refresh error`);
            }
        } catch (error) {
            throw new JwtError(`[${method}] ${url} error` + error);
        }
    };
    
    return makeRequest(jwtToken);
}