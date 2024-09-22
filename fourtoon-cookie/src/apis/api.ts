import { JwtError } from "../error/JwtError";
import { JWTToken } from "../types/jwt";
import { API_METHOD_TYPE, API_STATUS } from "../constants/api";
import { jwtManager } from "../auth/jwtManager";


export const requestApi = async (url: string, method: API_METHOD_TYPE, body?: any): Promise<Response> => {
    
    let leftTryCount: number = 2;

    while (leftTryCount > 0) {
        leftTryCount--;
        
        const response = await fetch(process.env.EXPO_PUBLIC_API_URL! + url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtManager.getToken()?.accessToken}`
            },
            body: body ? JSON.stringify(body) : undefined,
        });

        if (response.status != API_STATUS.UNAUTHORIZED) {
            return response;
        }

        if (leftTryCount > 0) {
            await jwtManager.refleshToken();
        }
    }

    throw new JwtError('인증에 실패했습니다.');
}