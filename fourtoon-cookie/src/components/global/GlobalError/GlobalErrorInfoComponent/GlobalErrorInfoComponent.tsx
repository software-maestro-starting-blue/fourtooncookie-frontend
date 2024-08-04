import { useContext } from "react";
import GlobalErrorInfoStateContext from "../GlobalErrorInfoStateContext";
import * as S from "./GlobalErrorInfoComponent.styled";
import { GlobalErrorInfoType } from "../../../../types/error";
import AlertModal from "../../../common/Modal/AlertModal/AlertModal";


const GlobalErrorInfoComponent = () => {
    const { errorInfo, setErrorInfo } = useContext(GlobalErrorInfoStateContext);

    const handleCloseErrorInfoModal = () => {
        if (! errorInfo) return;

        setErrorInfo(null);
        errorInfo.callback?.();
    }

    if (errorInfo === null) {
        return null;
    }

    if (errorInfo.type == GlobalErrorInfoType.MODAL)
    return ( 
            <AlertModal
                visible={errorInfo.type == GlobalErrorInfoType.MODAL}
                onClose={handleCloseErrorInfoModal}
                message={errorInfo ? errorInfo.message : ""}
            />
    );

}

export default GlobalErrorInfoComponent;