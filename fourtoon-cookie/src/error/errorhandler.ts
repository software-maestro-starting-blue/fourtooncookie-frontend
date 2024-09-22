import { Alert } from "react-native";
import { GlobalErrorInfoType } from "../types/error";
import { jwtManager } from "../auth/jwtManager";


const handleError = (error: Error, errorType: GlobalErrorInfoType, callback?: (error: Error) => void) => {
    switch(error.name) {
        case 'JwtError':
            jwtManager.setToken(null);
            break;
    }

    switch (errorType) {
        case GlobalErrorInfoType.ALERT:
            handleAlertError(error, callback);
            break;
        default:
            break;
    }
}

const handleAlertError = (error: Error, callback?: (error: Error) => void) => {
    Alert.alert(
        '오류가 발생하였습니다.',
        error.message,
        [
            {
                text: '확인',
                onPress: () => {
                    if (callback) {
                        callback(error);
                    }
                },
            },
        ]
    );
}

export default handleError;