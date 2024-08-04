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
    }

    if (errorInfo === null) {
        return null;
    }
    
    return ( (errorInfo.type == GlobalErrorInfoType.MODAL) &&
            <AlertModal
                visible={errorInfo.type == GlobalErrorInfoType.MODAL}
                onClose={handleCloseErrorInfoModal}
                message={errorInfo ? errorInfo.error.message : ""}
            />
    );

}

export default GlobalErrorInfoComponent;