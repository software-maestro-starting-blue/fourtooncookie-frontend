import React from "react";
import { View, Text, Button, Modal as RNModal, StyleSheet, Modal } from "react-native";
import * as S from './ConfirmationModal.styled';


export interface ConfirmationModalProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
}

const ConfirmationModal = (props: ConfirmationModalProps) => {
    const { visible, onClose, onConfirm, message, ...rest} = props;

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
                        <Button title="취소" onPress={onClose} />
                        <Button title="확인" onPress={onConfirm} />
                    </View>
                </View>
            </View>
        </RNModal>
    );
};

export default ConfirmationModal;
