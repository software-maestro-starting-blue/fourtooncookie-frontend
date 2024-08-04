import { ReactNode, useState } from "react"
import type { GlobalErrorInfo } from "../../../types/error";
import GlobalErrorInfoStateContext from "./GlobalErrorInfoStateContext";
import GlobalErrorInfoModal from "./GlobalErrorInfoModal/GlobalErrorInfoModal";

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
            <GlobalErrorInfoModal />
        </GlobalErrorInfoStateContext.Provider>
    );
}

export default GlobalErrorInfoStateProvider;