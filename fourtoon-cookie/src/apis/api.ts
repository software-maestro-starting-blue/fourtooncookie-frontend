import { JwtError } from "../error/JwtError";
import { JWTToken } from "../types/jwt";
import { API_METHOD_TYPE, API_STATUS } from "../constants/api";
import {  } from "../store/jwt";
import { useAccountStore } from "../store/account";


export const requestApi = async (url: string, method: API_METHOD_TYPE, body?: any): Promise<Response> => {
    let token: JWTToken | null = useAccountStore.getState().jwt;

    let leftTryCount: number = 2;

    while (leftTryCount > 0) {
        leftTryCount--;

        if (! token) {
            throw new JwtError('사용자 정보가 존재하지 않습니다. 다시 로그인해 주세요.');
        }
        
        const response = await fetch(process.env.EXPO_PUBLIC_API_URL! + url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.accessToken}`
            },
            body: body ? JSON.stringify(body) : undefined,
        });

        if (response.status != API_STATUS.UNAUTHORIZED) {
            return response;
        }

        if (leftTryCount > 0) {
            await useAccountStore.getState().refreshJWT();
            token = useAccountStore.getState().jwt;
        }
    }

    throw new JwtError('인증에 실패했습니다.');
}