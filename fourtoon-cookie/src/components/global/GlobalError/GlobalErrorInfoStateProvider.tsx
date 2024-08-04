import { ReactNode, useState } from "react"
import type { GlobalErrorInfo } from "../../../types/error";
import GlobalErrorInfoStateContext from "./GlobalErrorInfoStateContext";
import GlobalErrorInfoComponent from "./GlobalErrorInfoComponent/GlobalErrorInfoComponent";

export interface GlobalErrorInfoStateProviderProps {
    children: ReactNode,
}

const GlobalErrorInfoStateProvider = (props: GlobalErrorInfoStateProviderProps) => {
    const { children } = props;
    const [ errorInfo, setErrorInfoState ] = useState<GlobalErrorInfo | null>(null);


    const setErrorInfo = (errorInfo: GlobalErrorInfo | null) => {
        if (errorInfo && errorInfo?.error.name == 'JwtError') return;
        
        setErrorInfoState(errorInfo);
    }

    return (
        <GlobalErrorInfoStateContext.Provider value={{ errorInfo, setErrorInfo }}>
            {children}
            <GlobalErrorInfoComponent />
        </GlobalErrorInfoStateContext.Provider>
    );
}

export default GlobalErrorInfoStateProvider;