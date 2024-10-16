import React from 'react';
import { TouchableOpacity, Text, GestureResponderEvent, ViewStyle, TextStyle, StyleSheet } from 'react-native';

export interface ButtonProps {
    title: string;
    onPress: (event: GestureResponderEvent) => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

const Button = (props: ButtonProps) => {
    const { title, onPress, style, textStyle, ...rest} = props;
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
}

export default Button;

const styles = StyleSheet.create({
    button: {
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    }
});