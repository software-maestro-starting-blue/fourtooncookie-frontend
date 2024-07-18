import React from 'react';
import { TouchableOpacity, Text, GestureResponderEvent, ViewStyle, TextStyle } from 'react-native';
import * as S from './Button.styled';

export interface ButtonProps {
    title: string;
    onPress: (event: GestureResponderEvent) => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

const Button = (props: ButtonProps) => {
    const { title, onPress, style, textStyle, ...rest} = props;
    return (
        <TouchableOpacity style={[S.styles.button, style]} onPress={onPress}>
            <Text style={[S.styles.buttonText, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
}

export default Button;
