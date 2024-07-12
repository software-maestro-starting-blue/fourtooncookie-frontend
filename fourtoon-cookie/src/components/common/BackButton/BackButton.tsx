import React from 'react';
import { TouchableOpacity, Text, GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
import styles from './BackButtonStyles';
import {useNavigation} from "@react-navigation/native";

export interface BackButtonProps {
    style: StyleProp<ViewStyle>;
}

const BackButton = (props: BackButtonProps) => {
    const {style, ...rest} = props;
    const navigation = useNavigation();

    function handleOnPress() {
        return () => navigation.goBack();
    }

    return (
        <TouchableOpacity style={[styles.button, style]} onPress={handleOnPress}>
            <Text style={styles.buttonText}>{'<'}</Text>
        </TouchableOpacity>
    );
};

export default BackButton;
