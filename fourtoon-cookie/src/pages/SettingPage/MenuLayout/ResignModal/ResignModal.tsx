import { useContext } from "react";
import ConfirmationModal from "../../../../components/common/Modal/ConfirmationModal/ConfirmationModal"
import GlobalJwtTokenStateContext from "../../../../components/global/GlobalJwtToken/GlobalJwtTokenStateContext";
import { deleteMember } from "../../../../apis/member";

export interface ResignModalProps {
    visible: boolean;
    onClose: () => void;
}

const ResignModal = (props: ResignModalProps) => {
    const { visible, onClose } = props;
    const jwtContext = useContext(GlobalJwtTokenStateContext);

    const handleResign = () => {
        deleteMember(jwtContext);
        jwtContext.setJwtToken(null);
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