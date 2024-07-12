import React from 'react';
import { TouchableOpacity, Text, GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
import * as S from './BackButton.styled';
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
        <TouchableOpacity style={[S.styles.button, style]} onPress={handleOnPress}>
            <Text style={S.styles.buttonText}>{'<'}</Text>
        </TouchableOpacity>
    );
};

export default BackButton;
