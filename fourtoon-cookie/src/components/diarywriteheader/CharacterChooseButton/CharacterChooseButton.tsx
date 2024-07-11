import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import * as S from "./CharacterChooseButton.styled";

interface CharacterChooseButtonProps {
    onPress: () => void;
}

const CharacterChooseButton = (props: CharacterChooseButtonProps) => {
    const { onPress } = props;

    const character = "cookie"; // TODO: 로컬의 정보를 통해 캐릭터의 정보를 가지고 옵니다.

    return (
        <TouchableOpacity onPress={onPress}>
            <Image source={require(`../../assets/${character}.png`)} />
        </TouchableOpacity>
    );
}

export default CharacterChooseButton;