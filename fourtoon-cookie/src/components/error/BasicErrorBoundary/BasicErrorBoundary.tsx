import { ErrorBoundary, FallbackProps } from "react-error-boundary"
import ErrorComponent from "../ErrorComponent/ErrorComponent"
import { ReactNode, useEffect, useState } from "react"
import { useAccountState } from "../../../hooks/account"
import { JwtError } from "../../../types/error/JwtError"
import { ApiError } from "../../../types/error/ApiError"
import { Alert } from "react-native"
import { RuntimeError } from "../../../types/error/RuntimeError"
import { SelectedCharacterNotExistError } from "../../../types/error/character/SelectedCharacterNotExistError"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { RootStackParamList } from "../../../types/routing"

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

        if (error instanceof SelectedCharacterNotExistError) {
            setEffectHandler(() => {
                Alert.alert("선택된 캐릭터가 존재하지 않습니다. 캐릭터 선택 화면으로 이동합니다.");
                navigation.navigate("CharacterSelectPage");
            });
            return true;
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