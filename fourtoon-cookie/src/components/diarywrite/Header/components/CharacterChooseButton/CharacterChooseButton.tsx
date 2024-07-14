import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';

import * as S from "./CharacterChooseButton.styled";

export interface CharacterChooseButtonProps {
    onPress: () => void;
}

const CharacterChooseButton = (props: CharacterChooseButtonProps) => {
    const { onPress } = props;

    const character = "favicon"; // TODO: 로컬의 정보를 통해 캐릭터의 정보를 가지고 옵니다.

    return (
        <TouchableOpacity onPress={onPress} style={S.styles.button}>
            <Image source={require(`../../../../../../assets/${character}.png`)} style={S.styles.image}/>
        </TouchableOpacity>
    );
}

export default CharacterChooseButton;