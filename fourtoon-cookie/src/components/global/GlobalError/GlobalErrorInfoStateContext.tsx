import { createContext } from "react";
import type { GlobalErrorInfo } from "../../../types/error";


export interface GlobalErrorInfoStateContextProps {
    errorInfo: GlobalErrorInfo | null;
    setErrorInfo: (errorInfo: GlobalErrorInfo | null) => void;
}

export const defaultValueOfGlobalErrorInfoStateContextProps: GlobalErrorInfoStateContextProps = {
    errorInfo: null,
    setErrorInfo: () => {}
}

const GlobalErrorInfoStateContext = createContext<GlobalErrorInfoStateContextProps>(defaultValueOfGlobalErrorInfoStateContextProps);

export default GlobalErrorInfoStateContext;