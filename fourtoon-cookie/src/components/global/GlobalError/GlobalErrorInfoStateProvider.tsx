import { ReactNode, useState } from "react"
import type { GlobalErrorInfo } from "../../../types/error";
import GlobalErrorInfoStateContext from "./GlobalErrorInfoStateContext";
import GlobalErrorInfoComponent from "./GlobalErrorInfoComponent/GlobalErrorInfoComponent";
import { JwtError } from "../../../error/JwtError";

export interface GlobalErrorInfoStateProviderProps {
    children: ReactNode,
}

const GlobalErrorInfoStateProvider = (props: GlobalErrorInfoStateProviderProps) => {
    const { children } = props;
    const [ errorInfo, setErrorInfoState ] = useState<GlobalErrorInfo | null>(null);


    const setErrorInfo = (changedErrorInfo: GlobalErrorInfo | null) => {
        if (! errorInfo || ! changedErrorInfo || ! (errorInfo.error instanceof JwtError)){
            setErrorInfoState(changedErrorInfo);
        }
    }

    return (
        <GlobalErrorInfoStateContext.Provider value={{ errorInfo, setErrorInfo }}>
            {children}
            <GlobalErrorInfoComponent />
        </GlobalErrorInfoStateContext.Provider>
    );
}

export default GlobalErrorInfoStateProvider;