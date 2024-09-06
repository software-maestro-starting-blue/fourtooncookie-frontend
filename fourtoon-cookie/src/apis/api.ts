import { JwtError } from "../error/JwtError";
import { ApiError } from "../error/ApiError";
import { jwtManager } from "./jwt";


export const requestApi = async (url: string, method: string, body?: any): Promise<Response> => {
    let token = jwtManager.getToken();

    const makeRequest = async (isRetry: boolean = false): Promise<Response> => {
        if (! token) {
            throw new JwtError('사용자 정보가 존재하지 않습니다. 다시 로그인해 주세요.');
        }

        try {
            const response = await fetch(process.env.EXPO_PUBLIC_API_URL! + url, {
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
                    await jwtManager.refleshToken();
                    token = jwtManager.getToken();
                    return makeRequest(true);
                } else {
                    throw new JwtError(`잘못된 요청입니다. 사용자 정보가 유효하지 않습니다.`);
                }
            } else {
                throw new ApiError(`요청이 실패했습니다. 잠시후 다시 시도해 주세요.`);
            }
        } catch (error) {
            throw error;
        }
    };
    
    return makeRequest();
}