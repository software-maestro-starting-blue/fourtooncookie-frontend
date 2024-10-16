import Toast from "react-native-toast-message";


export const showSuccessToast = (message: string, detail?: string) => {
    Toast.show({
        type: 'success',
        text1: message,
        text2: detail,
        position: 'bottom',
    });
}

export const showErrorToast = (message: string, detail?: string) => {
    Toast.show({
        type: 'error',
        text1: message,
        text2: detail,
        position: 'bottom',
    });
}

export const showInfoToast = (message: string, detail?: string) => {
    Toast.show({
        type: 'info',
        text1: message,
        text2: detail,
        position: 'bottom',
    });
}