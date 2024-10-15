// DiaryEmpty.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import * as S from './DiaryEmpty.styled';
import { RootStackParamList } from '../../../types/routing';
import { useTranslationWithParentName } from '../../../hooks/locale';

const DiaryEmpty = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const t = useTranslationWithParentName('pages.diaryTimelinePage.diaryEmpty');

    return (
        <View style={S.styles.container}>
            <TouchableOpacity style={S.styles.button} onPress={() => navigation.navigate('DiaryWritePage', {})}>
                <Text style={S.styles.text}>{t("writeDiary")}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default DiaryEmpty;