import { useContext } from "react";
import ConfirmationModal from "../../../../components/common/Modal/ConfirmationModal/ConfirmationModal"
import { deleteMember } from "../../../../apis/member";
import GlobalErrorInfoStateContext from "../../../../components/global/GlobalError/GlobalErrorInfoStateContext";
import { GlobalErrorInfoType } from "../../../../types/error";
import { jwtManager } from "../../../../apis/jwt";

export interface ResignModalProps {
    visible: boolean;
    onClose: () => void;
}

const ResignModal = (props: ResignModalProps) => {
    const { visible, onClose } = props;

    const { errorInfo, setErrorInfo } = useContext(GlobalErrorInfoStateContext);

    const handleResign = async () => {
        try {
            onClose();
            await deleteMember();
            jwtManager.setToken(null);
        } catch (error) {
            if (error instanceof Error) {
                setErrorInfo({
                    type: GlobalErrorInfoType.MODAL,
                    error: error,
                });
            }
        }
    }

    return (
        <ConfirmationModal
            visible={visible}
            onClose={onClose}
            onConfirm={handleResign}
            message="정말 탈퇴하시겠습니까?"
        />
    );
}

export default ResignModal;