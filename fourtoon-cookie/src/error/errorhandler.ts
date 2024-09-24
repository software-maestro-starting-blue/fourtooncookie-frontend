import { useJwtStore } from "../store/jwt";


const handleError = (error: Error, callback?: (error: Error) => void) => {
    switch(error.name) {
        case 'JwtError':
            useJwtStore.getState().removeToken();
            break;
    }

}

export default handleError;