import { ErrorBoundary, FallbackProps } from "react-error-boundary"
import ErrorComponent from "../ErrorComponent/ErrorComponent"
import { ErrorInfo, ReactNode, useState } from "react"
import { useAccountState } from "../../../hooks/account"
import { JwtError } from "../../../types/error/JwtError"
import { ApiError } from "../../../types/error/ApiError"
import { Alert } from "react-native"

export interface BasicErrorBoundaryProps {
    children: ReactNode
}

const BasicErrorBoundary = (props: BasicErrorBoundaryProps) => {
    const { children } = props;
    const [ isHandled, setIsHandled ] = useState<boolean>(false);

    const { logout } = useAccountState();

    const handleError = (error: Error, info: ErrorInfo) => {
        if (error instanceof JwtError) {
            logout();
            return true;
        }

        if (error instanceof ApiError) {
            const status = error.getStatus();
            if (status === null) {
                Alert.alert("에러가 발생하였습니다. 문제가 지속되면 관리자에게 알려주세요.", error.message);
                return true;
            }

            if (400 <= status && status <= 499) {
                Alert.alert("문제가 발생하였습니다. 문제가 지속되면 관리자에게 알려주세요.", error.message);
                return true;
            }

            if (500 <= status && status <= 599) {
                Alert.alert("서버에서 문제가 발생하였습니다. 문제가 지속되면 관리자에게 알려주세요.", error.message);
                return true;
            }
        }

        return false;
    }

    const handleErrorOnErrorBoundary = (error: Error, info: ErrorInfo) => {
        setIsHandled(handleError(error, info));
    }

    const ErrorComponentWithIsHandled = (props: FallbackProps) => !isHandled && <ErrorComponent {...props} />

    return (
        <ErrorBoundary onError={handleErrorOnErrorBoundary} FallbackComponent={ErrorComponentWithIsHandled} >
            {children}
        </ErrorBoundary>
    );
}

export default BasicErrorBoundary;