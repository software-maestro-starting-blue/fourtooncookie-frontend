// DiaryEmpty.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import * as S from './DiaryEmpty.styled';
import { RootStackParamList } from '../../../types/routing';

const DiaryEmpty = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <View style={S.styles.container}>
            <TouchableOpacity style={S.styles.button} onPress={() => navigation.navigate('DiaryWritePage', {})}>
                <Text style={S.styles.text}>일기를 작성해보아요!</Text>
            </TouchableOpacity>
        </View>
    );
};

export default DiaryEmpty;