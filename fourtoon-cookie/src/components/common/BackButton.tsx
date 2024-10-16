import React from 'react';
import { TouchableOpacity, Text, GestureResponderEvent, StyleProp, ViewStyle, Image, StyleSheet } from 'react-native';
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
        <TouchableOpacity style={[backButtonStyles.button, style]} onPress={handlePress}>
           <Image source={require('../../../assets/icon/backbutton.png')} style={backButtonStyles.buttonImage} />
        </TouchableOpacity>
    );
};

export default BackButton;

const backButtonStyles = StyleSheet.create({
    button: {
        position: 'relative',
        padding: 20,
    },
    buttonImage: {
        width: 24,
        height: 24,
    },
});
