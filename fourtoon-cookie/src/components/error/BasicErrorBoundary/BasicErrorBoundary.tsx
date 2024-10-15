import { ErrorBoundary, FallbackProps } from "react-error-boundary"
import ErrorComponent from "../ErrorComponent/ErrorComponent"
import { ReactNode } from "react"
import { useAccountState } from "../../../hooks/account"
import { JwtError } from "../../../types/error/JwtError"
import { ApiError } from "../../../types/error/ApiError"
import { Alert } from "react-native"
import { RuntimeError } from "../../../types/error/RuntimeError"
import { useTranslationWithParentName } from "../../../hooks/locale"

export interface BasicErrorBoundaryProps {
    handleErrorBeforeHandling?: (error: Error) => boolean,
    handleErrorAfterHandling?: (error: Error) => boolean,
    children: ReactNode
}

const BasicErrorBoundary = (props: BasicErrorBoundaryProps) => {
    const { handleErrorBeforeHandling, handleErrorAfterHandling, children } = props;

    const { logout } = useAccountState();

    const t = useTranslationWithParentName('error');

    const handleError = (error: Error) => {
        if (handleErrorBeforeHandling && handleErrorBeforeHandling(error)) {
            return true;
        }

        if (error instanceof JwtError) {
            logout();
            return true;
        }

        if (error instanceof ApiError) {
            const status = error.getStatus();
            if (status === null) {
                Alert.alert(t("default"), error.message);
                return true;
            }

            if (400 <= status && status <= 499) {
                Alert.alert(t("user"), error.message);
                return true;
            }

            if (500 <= status && status <= 599) {
                Alert.alert(t("server"), error.message);
                return true;
            }
        }

        if (error instanceof RuntimeError) {
            Alert.alert(error.message);
            return true;
        }

        if (handleErrorAfterHandling && handleErrorAfterHandling(error)) {
            return true;
        }

        return false;
    }

    const ErrorComponentWithIsHandled = (props: FallbackProps) => {
        const isHandled = handleError(props.error);

        if (isHandled) {
            props.resetErrorBoundary();
            return null;
        }

        return <ErrorComponent {...props} />
    }

    return (
        <ErrorBoundary FallbackComponent={ErrorComponentWithIsHandled} >
            {children}
        </ErrorBoundary>
    );
}

export default BasicErrorBoundary;