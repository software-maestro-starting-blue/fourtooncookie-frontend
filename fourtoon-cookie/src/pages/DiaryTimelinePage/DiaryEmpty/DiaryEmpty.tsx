// DiaryEmpty.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import AddIcon from '../../../../assets/icon/add.png';
import * as S from './DiaryEmpty.styled';
import { RootStackParamList } from '../../../constants/routing';

const DiaryEmpty = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <View style={S.styles.container}>
            <TouchableOpacity style={S.styles.button} onPress={() => navigation.navigate('DiaryWritePage', {})}>
                <Image source={AddIcon} style={S.styles.image} />
                <Text style={S.styles.text}>Write a diary</Text>
            </TouchableOpacity>
        </View>
    );
};

export default DiaryEmpty;