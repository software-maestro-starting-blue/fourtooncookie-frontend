import React from 'react';
import { TouchableOpacity, Text, GestureResponderEvent, StyleProp, ViewStyle, Image } from 'react-native';
import * as S from './BackButton.styled';
import {useNavigation} from "@react-navigation/native";

export interface BackButtonProps {
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}

const BackButton = (props: BackButtonProps) => {
    const {onPress, style, ...rest} = props;
    const navigation = useNavigation();

    const handlePress = () => {
        if (onPress){
            onPress();
            return;
        }
        navigation.goBack();
    }

    return (
        <TouchableOpacity style={[S.styles.button, style]} onPress={handlePress}>
           <Image source={require('../../../../assets/icon/backbutton.png')} style={S.styles.buttonImage} />
        </TouchableOpacity>
    );
};

export default BackButton;
