import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Modal from 'react-native-modal';
import DOWN_ARROW from '../../../assets/icon/down-arrow.png';

import { LocalDate } from '@js-joda/core';
import { useFunctionWithErrorHandling } from '../../hooks/error';
import { useDiaryWritePageContext } from './DiaryWritePageProvider';
import { Calendar, DateData } from 'react-native-calendars';
import Button from '../../components/common/Button';
import { useTranslationWithParentName } from '../../hooks/locale';

const DateInfo = () => {
    const { currentDiaryId, diaryDate, setDiaryDate } = useDiaryWritePageContext();

    const [ selectedDate, setSelectedDate ] = useState<LocalDate>(LocalDate.now());
    const [isDatePickerVisible, setDatePickerVisible] = useState<boolean>(false);

    const { functionWithErrorHandling } = useFunctionWithErrorHandling();

    const commonT = useTranslationWithParentName('common');

    const isChangeable: boolean = ! currentDiaryId;
    const dateString: string = diaryDate.toString();

    const handleDatePress = functionWithErrorHandling(() => {
        if (! isChangeable) return;
        setDatePickerVisible(true);
    });

    const handleClose = functionWithErrorHandling(() => {
        setDatePickerVisible(false);
    })

    const handleDayPress = functionWithErrorHandling((date: DateData) => {
        setSelectedDate(LocalDate.parse(date.dateString));
    })

    const handleDone = functionWithErrorHandling(() => {
        setDiaryDate(selectedDate);
        handleClose();
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleDatePress} style={styles.view}>
                <Text style={styles.date}>{dateString}</Text>
                <Image source={DOWN_ARROW} style={styles.downArrow} />
            </TouchableOpacity>
            <Modal 
                isVisible={isDatePickerVisible}
                onBackdropPress={handleClose}
                onBackButtonPress={handleClose}
            >
                <View style={styles.dateModal}>
                    <View style={styles.dateModalCalender}>
                        <Calendar
                            current={selectedDate.toString()}
                            onDayPress={handleDayPress}
                            markedDates={{
                                [selectedDate.toString()]: {
                                    selected: true, 
                                    selectedColor: '#FFC426'
                                }
                            }}
                            theme={{arrowColor: '#FFC426'}}
                            maxDate={LocalDate.now().toString()}
                        />
                    </View>
                    <Button title={commonT('done')} onPress={handleDone} style={styles.dateModalButton}/>
                </View>
            </Modal>
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
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        backgroundColor: 'white',
    },
    dateModalCalender: {
        width: '90%'
    },
    dateModalButton: {
        width: '100%',
        height: 60,
        borderRadius: 16,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFC426',
    }
});