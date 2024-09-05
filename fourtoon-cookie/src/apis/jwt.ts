import AsyncStorage from "@react-native-async-storage/async-storage";
import { JWTToken } from "../types/jwt";

class JwtManager {
    
    private token: JWTToken | null;

    constructor() {
        this.token = null;

        const loadJwtToken = async () => {
            try {
                const savedJwtToken = await AsyncStorage.getItem('jwtToken');
                if (savedJwtToken) {
                    this.token = JSON.parse(savedJwtToken);
                }
            } catch (error) {
                console.log(error);
            }
        };

        loadJwtToken();
    }

    getToken(): JWTToken | null {
        return this.token;
    }

    async setToken(token: JWTToken | null) {
        try {
            if (token) {
                await AsyncStorage.setItem('jwtToken', JSON.stringify(token));
            } else {
                await AsyncStorage.removeItem('jwtToken');
            }
            this.token = token;
        } catch (e) {
            throw new Error('인증에 실패 했습니다. 잠시후 다시 시도해 주세요.');
        }
    }

    refleshToken() {
        // TODO: JWTToken을 reflesh한다.
    }

}


export const jwtManager = new JwtManager();