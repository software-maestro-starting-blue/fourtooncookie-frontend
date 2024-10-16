import React from "react";
import { View, Text, Button, Modal as RNModal, StyleSheet, Modal } from "react-native";
import * as S from './AlertModal.styled';
import { useTranslationWithParentName } from "../../../../hooks/locale";


export interface AlertModalProps {
    visible: boolean;
    onClose: () => void;
    message: string;
}

const AlertModal = (props: AlertModalProps) => {
    const { visible, onClose, message, ...rest} = props;

    const t = useTranslationWithParentName('components.alertModal');

    return (
        <RNModal
            transparent={true}
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={S.styles.modalContainer}>
                <View style={S.styles.modalContent}>
                    <Text style={S.styles.modalText}>{message}</Text>
                    <View style={S.styles.modalButtons}>
                        <Button title={t("close")} onPress={onClose} />
                    </View>
                </View>
            </View>
        </RNModal>
    );
};

export default AlertModal;
