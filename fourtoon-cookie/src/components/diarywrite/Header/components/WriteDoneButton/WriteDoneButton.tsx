import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import * as S from "./WriteDoneButton.styled";

export interface WriteDoneButtonProps {
    onPress: () => void;
}

const WriteDoneButton = (props: WriteDoneButtonProps) => {
    const { onPress } = props;
    
    return (
        <TouchableOpacity style={S.styles.writeDoneButton} onPress={onPress}>
            <Text style={S.styles.writeDoneButtonText}> ✏️ </Text>
        </TouchableOpacity>
    );
};

export default WriteDoneButton;