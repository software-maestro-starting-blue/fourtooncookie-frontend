import { useContext } from "react";
import ConfirmationModal from "../../../../components/common/Modal/ConfirmationModal/ConfirmationModal"
import { deleteMember } from "../../../../apis/member";
import GlobalErrorInfoStateContext from "../../../../components/global/GlobalError/GlobalErrorInfoStateContext";
import { GlobalErrorInfoType } from "../../../../types/error";
import { jwtManager } from "../../../../apis/jwt";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../../constants/routing";

export interface ResignModalProps {
    visible: boolean;
    onClose: () => void;
}

const ResignModal = (props: ResignModalProps) => {
    const { visible, onClose } = props;

    const { errorInfo, setErrorInfo } = useContext(GlobalErrorInfoStateContext);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleResign = async () => {
        try {
            await deleteMember();
            await jwtManager.setToken(null);
            navigation.navigate('IntroPage');
            onClose();
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