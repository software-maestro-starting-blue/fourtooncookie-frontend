import React from 'react';
import { Image } from "react-native";
import * as S from "./Hashtag.styled";
import { hashtags } from '../../../../../types/hashtags/hashtag';

export interface HashtagProps {
    hashtagId: number
}


const Hashtag = (props: HashtagProps) => {
    const { hashtagId } = props;

    const hashtag = hashtags[hashtagId]

    if (! hashtag) return null;

    return (
        <Image source={hashtag.image} style={S.styles.image} />
    );
}

export default Hashtag;