import { JwtError } from "../types/error/JwtError";
import { JWTToken } from "../types/jwt";
import { API_METHOD_TYPE, API_STATUS } from "../types/api";
import { useJwtStore } from "../hooks/store/jwt";


export const requestApi = async (url: string, method: API_METHOD_TYPE, body?: any): Promise<Response> => {
    

    let token: JWTToken | null = useJwtStore.getState().token;

    let leftTryCount: number = 2;

    while (leftTryCount > 0) {
        leftTryCount--;
        
        const response = await fetch(process.env.EXPO_PUBLIC_API_URL! + url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token?.accessToken}`
            },
            body: body ? JSON.stringify(body) : undefined,
        });

        if (response.status != API_STATUS.UNAUTHORIZED) {
            return response;
        }

        if (leftTryCount > 0) {
            await useJwtStore.getState().refreshToken();
            token = useJwtStore.getState().token;
        }
    }

    throw new JwtError('인증에 실패했습니다.');
}