import { ReactNode, useState } from "react"
import type { GlobalErrorInfo } from "../../../types/error";
import GlobalErrorInfoStateContext from "./GlobalErrorInfoStateContext";

export interface GlobalErrorInfoStateProviderProps {
    children: ReactNode,
}

const GlobalErrorInfoStateProvider = (props: GlobalErrorInfoStateProviderProps) => {
    const { children } = props;
    const [ errorInfo, setErrorInfoState ] = useState<GlobalErrorInfo | null>(null);


    const setErrorInfo = (errorInfo: GlobalErrorInfo | null) => {
        setErrorInfoState(errorInfo);
    }

    return (
        <GlobalErrorInfoStateContext.Provider value={{ errorInfo, setErrorInfo }}>
            {children}
        </GlobalErrorInfoStateContext.Provider>
    );
}

export default GlobalErrorInfoStateProvider;