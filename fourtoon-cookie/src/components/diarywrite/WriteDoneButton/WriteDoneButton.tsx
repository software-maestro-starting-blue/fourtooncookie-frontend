import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import * as S from "./WriteDoneButton.styled";

interface WriteDoneButtonProps {
    onPress: () => void;
}

const WriteDoneButton = (props: WriteDoneButtonProps) => {
    const { onPress } = props;
    
    return (
        <TouchableOpacity onPress={onPress}>
            <Text>Done</Text>
        </TouchableOpacity>
    );
};

export default WriteDoneButton;