import { API_URL } from "@env";
import { GlobalJwtTokenStateContextProps } from "../components/global/GlobalJwtToken/GlobalJwtTokenStateContext";
import type { JWTToken } from "../types/jwt";
import { supabaseRefreshToken } from "./supabase";
import { JwtError } from "../error/JwtError";
import { ApiError } from "../error/ApiError";


export const requestApi = async (url: string, method: string, jwtContext: GlobalJwtTokenStateContextProps, body?: any): Promise<Response> => {
    const { jwtToken, setJwtToken } = jwtContext;

    if (!jwtToken) {
        throw new JwtError('토큰이 존재하지 않습니다. 다시 로그인해 주세요.');
    }

    const refreshJwtToken = async () => {
        try {
            const newToken = await supabaseRefreshToken(jwtToken.refreshToken);
            setJwtToken(newToken);
            return newToken;
        } catch (error) {
            setJwtToken(null);
            throw new JwtError('토큰이 존재하지 않습니다. 다시 로그인해 주세요.');
        }
    };

    const makeRequest = async (token: JWTToken, isRetry: boolean = false): Promise<Response> => {
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
                    throw new JwtError(`잘못된 요청입니다. 토큰이 유효하지 않습니다.`);
                }
            } else {
                throw new ApiError(`요청이 실패했습니다. 잠시후 다시 시도해 주세요.`);
            }
        } catch (error) {
            throw error;
        }
    };
    
    return makeRequest(jwtToken);
}