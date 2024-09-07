import { Alert } from "react-native";
import { GlobalErrorInfoType } from "../types/error";


const handleError = (error: Error, errorType: GlobalErrorInfoType, callback?: (error: Error) => void) => {
    console.error(error);

    switch (errorType) {
        case GlobalErrorInfoType.MODAL:
            handleModalError(error, callback);
            break;
        default:
            break;
    }
}

const handleModalError = (error: Error, callback?: (error: Error) => void) => {
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