import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DOWN_ARROW from '../../../assets/icon/down-arrow.png';

import { LocalDate } from '@js-joda/core';
import { useFunctionWithErrorHandling } from '../../hooks/error';
import { useDiaryWritePageContext } from './DiaryWritePageProvider';

const DateInfo = () => {
    const { currentDiaryId, diaryDate, setDiaryDate } = useDiaryWritePageContext();

    const [isDatePickerVisible, setDatePickerVisible] = useState<boolean>(false);

    const { functionWithErrorHandling } = useFunctionWithErrorHandling();

    const isChangeable: boolean = ! currentDiaryId;
    const dateString: string = diaryDate.toString();

    const handleDatePress = functionWithErrorHandling(() => {
        if (! isChangeable) return;
        setDatePickerVisible(true);
    });

    const handleCancel = functionWithErrorHandling(() => {
        setDatePickerVisible(false);
    })

    const handleConfirm = functionWithErrorHandling((date: Date) => {
        if (date.getTime() > Date.now()) return;
        const localDate: LocalDate = LocalDate.of(date.getFullYear(), date.getMonth() + 1, date.getDate());
        setDiaryDate(localDate);
        setDatePickerVisible(false);
    })


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleDatePress} style={styles.view}>
                <Text style={styles.date}>{dateString}</Text>
                <Image source={DOWN_ARROW} style={styles.downArrow} />
            </TouchableOpacity>
            <DateTimePickerModal 
                isVisible={isDatePickerVisible}
                mode="date"
                date={new Date(diaryDate.year(), diaryDate.monthValue() - 1, diaryDate.dayOfMonth())}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                style={styles.dateModal}
            />
        </View>
    );
};

export default DateInfo;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    view: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    date: {
        fontFamily: 'Pretendard',
        fontWeight: '600',
        fontSize: 17,
        lineHeight: 24,
        display: 'flex',
        alignItems: 'center',
        letterSpacing: -0.5,
        color: '#212121',
    },
    downArrow: {
        width: 24,
        height: 24,
        marginLeft: 10,
    },
    dateModal: {
        position: "absolute"
    }
});