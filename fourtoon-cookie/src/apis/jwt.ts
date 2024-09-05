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

    setToken(token: JWTToken | null) {
        // TODO: token을 설정하고, AsyncStorage에 이를 반영한다.
    }

    refleshToken() {
        // TODO: JWTToken을 reflesh한다.
    }

}


export const jwtManager = new JwtManager();