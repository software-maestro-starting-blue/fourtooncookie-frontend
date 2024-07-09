import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import * as S from "./CharacterChooseButton.styled";

interface CharacterChooseButtonProps {
    character: string;
    onPress: () => void;
}

const CharacterChooseButton = (props: CharacterChooseButtonProps) => {
    const { character, onPress } = props;

    return (
        <TouchableOpacity onPress={onPress}>
            <Image source={require(`../../assets/${character}.png`)} />
        </TouchableOpacity>
    );
}

export default CharacterChooseButton;