import ConfirmationModal from "../../../../components/common/Modal/ConfirmationModal/ConfirmationModal"
import { GlobalErrorInfoType } from "../../../../types/error";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../../constants/routing";
import handleError from "../../../../error/errorhandler";
import { useMemberStore } from "../../../../store/member";

export interface ResignModalProps {
    visible: boolean;
    onClose: () => void;
}

const ResignModal = (props: ResignModalProps) => {
    const { visible, onClose } = props;

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const { resignMember } = useMemberStore();

    const handleResign = async () => {
        try {
            resignMember();
            navigation.navigate('IntroPage');
            onClose();
        } catch (error) {
            if (error instanceof Error) {
                handleError(
                    error,
                    GlobalErrorInfoType.ALERT
                );
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