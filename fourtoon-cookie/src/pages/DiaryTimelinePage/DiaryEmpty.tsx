import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/routing';
import { useTranslationWithParentName } from '../../hooks/locale';

const DiaryEmpty = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const t = useTranslationWithParentName('pages.diaryTimelinePage.diaryEmpty');

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DiaryWritePage', {})}>
                <Text style={styles.text}>{t("writeDiary")}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default DiaryEmpty;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        fontSize: 24,
        marginLeft: 10,
        color: '#000'
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    image: {
        width: 20,
        height: 20
    }
});
