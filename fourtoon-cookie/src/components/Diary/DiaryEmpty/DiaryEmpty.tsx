// DiaryEmpty.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DiaryWritePage from '../../../pages/DiaryWritePage/DiaryWritePage';
import AddIcon from '../../../../assets/icon/add.png';
import * as S from './DiaryEmpty.styled';

const DiaryEmpty = () => {
    const navigation = useNavigation();

    return (
        <View style={S.styles.container}>
            <TouchableOpacity style={S.styles.button} onPress={() => navigation.navigate(DiaryWritePage as never)}>
                <Image source={AddIcon} style={S.styles.image} />
                <Text style={S.styles.text}>Write a diary</Text>
            </TouchableOpacity>
        </View>
    );
};

export default DiaryEmpty;
