// DiaryEmpty.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DiaryWritePage from '../../../pages/DiaryWritePage/DiaryWritePage';
import AddIcon from '../../../../assets/icon/add.png';
import { styles } from './DiaryEmpty.styled';

const DiaryEmpty = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(DiaryWritePage as never)}>
                <Image source={AddIcon} style={styles.image} />
                <Text style={styles.text}>Write a diary</Text>
            </TouchableOpacity>
        </View>
    );
};

export default DiaryEmpty;
