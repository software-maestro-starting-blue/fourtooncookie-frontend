import { ErrorBoundary, FallbackProps } from "react-error-boundary"
import handleError from "../../../error/errorhandler"
import ErrorComponent from "../ErrorComponent/ErrorComponent"
import { ErrorInfo, ReactNode, useState } from "react"

export interface BasicErrorBoundaryProps {
    children: ReactNode
}

const BasicErrorBoundary = (props: BasicErrorBoundaryProps) => {
    const { children } = props;
    const [ isHandled, setIsHandled ] = useState<boolean>(false);

    const handleErrorOnErrorBoundary = (error: Error, info: ErrorInfo) => {
        const isErrorHandled = handleError(error, info);
        setIsHandled(isErrorHandled);
    }

    const ErrorComponentWithIsHandled = (props: FallbackProps) => isHandled && <ErrorComponent {...props} />

    return (
        <ErrorBoundary onError={handleErrorOnErrorBoundary} FallbackComponent={ErrorComponentWithIsHandled} >
            {children}
        </ErrorBoundary>
    );
}

export default BasicErrorBoundary;