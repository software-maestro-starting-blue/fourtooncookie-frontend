import { JWTToken } from "../types/jwt";

class JwtManager {
    
    private token: JWTToken | null;

    constructor() {
        // TODO: AsyncStorage를 통해 JWT 존재 여부 확인 후 저장
    }

    getToken(): JWTToken | null {
        return this.token;
    }

    setToken(token: JWTToken | null) {
        // TODO: token을 설정하고, AsyncStorage에 이를 반영한다.
    }

    refleshToken() {
        // TODO: JWTToken을 reflesh한다.
    }

}


export const jwtManager = new JwtManager();