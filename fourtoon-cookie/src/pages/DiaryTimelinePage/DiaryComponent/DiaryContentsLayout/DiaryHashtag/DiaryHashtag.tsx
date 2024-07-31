import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import * as S from './DIaryHashtag.styeld';

export interface DiaryHashtagProps {
    hashtagIds: number[];
}

// const hashtagImages: Record<number, any> = {
//     1: require('../../../../assets/hashtag/hashtag1.png'),
//     2: require('../../../../assets/hashtag/'),
//     3: require('../../../../assets/hashtag/'),
//     // Add more hashtag images as needed
// };

const hashtagTexts: Record<number, any> = {
    1: '😀',
    2: '👍',
    3: '🎉',
};

const DiaryHashtag = (props: DiaryHashtagProps) => {
    const {hashtagIds} = props;

    return (
        <View style={S.styles.container}>
            {hashtagIds.map(id => (
                <View key={id} style={S.styles.hashtagContainer}>
                    {/* <Image source={hashtagImages[id]} style={S.styles.image} /> */}
                    <Text>{hashtagTexts[id]}</Text>
                </View>
            ))}
        </View>
    );
};

export default DiaryHashtag;
