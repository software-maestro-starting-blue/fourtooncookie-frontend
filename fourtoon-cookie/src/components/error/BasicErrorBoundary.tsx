import { ErrorBoundary, FallbackProps } from "react-error-boundary"
import ErrorComponent from "./ErrorComponent"
import { ReactNode, useEffect, useState } from "react"
import { useAccountState } from "../../hooks/account"
import { JwtError } from "../../types/error/JwtError"
import { ApiError } from "../../types/error/ApiError"
import { RuntimeError } from "../../types/error/RuntimeError"
import { useTranslationWithParentName } from "../../hooks/locale"
import { SelectedCharacterNotExistError } from "../../types/error/character/SelectedCharacterNotExistError"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { RootStackParamList } from "../../types/routing"
import { showErrorToast, showInfoToast } from "../../system/toast"

export interface BasicErrorBoundaryProps {
    handleErrorBeforeHandling?: (error: Error) => boolean,
    handleErrorAfterHandling?: (error: Error) => boolean,
    children: ReactNode
}

const BasicErrorBoundary = (props: BasicErrorBoundaryProps) => {
    const { handleErrorBeforeHandling, handleErrorAfterHandling, children } = props;

    const [ effectHandler, setEffectHandler ] = useState<undefined | (() => void)>(undefined);

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const { logout } = useAccountState();

    const t = useTranslationWithParentName('error');
    useEffect(() => {
        if (effectHandler) {
            effectHandler();
            setEffectHandler(undefined);
        }
    }, [effectHandler]);

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
                showErrorToast(t("default"), error.message);
                return true;
            }

            if (400 <= status && status <= 499) {
                showErrorToast(t("user"), error.message);
                return true;
            }

            if (500 <= status && status <= 599) {
                showErrorToast(t("server"), error.message);
                return true;
            }
        }

        if (error instanceof SelectedCharacterNotExistError) {
            setEffectHandler(() => {
                showInfoToast(t("characterNotSelected"));
                navigation.navigate("CharacterSelectPage");
            });
            return true;
        }

        if (error instanceof RuntimeError) {
            showErrorToast(error.message);
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