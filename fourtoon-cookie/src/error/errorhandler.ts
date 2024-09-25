import { ErrorInfo } from "react";
import { useJwtStore } from "../hooks/store/jwt";


const handleError = (error: Error, info: ErrorInfo): boolean => {
    switch(error.name) {
        case 'JwtError':
            useJwtStore.getState().removeToken();
            return true;
    }

    // TODO 처리 된 경우와 안 된 경우를 나누어서 return 처리

    return false;


}

export default handleError;