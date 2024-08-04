import { useContext } from "react";
import GlobalErrorInfoStateContext from "../GlobalErrorInfoStateContext";
import * as S from "./GlobalErrorInfoModal.styled";
import ConfirmationModal from "../../../common/Modal/ConfirmationModal/ConfirmationModal";
import { GlobalErrorInfoType } from "../../../../types/error";
import AlertModal from "../../../common/Modal/AlertModal/AlertModal";


const GlobalErrorInfoModal = () => {
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

export default GlobalErrorInfoModal;