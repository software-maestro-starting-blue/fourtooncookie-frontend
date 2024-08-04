import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import * as S from "./DateInfo.styled";
import { LocalDate } from '@js-joda/core';

export interface DateInfoProps {
    date: LocalDate;
    isChangeable: boolean;
    onDateChange: (date: LocalDate) => void;
}

const DateInfo = (props: DateInfoProps) => {
    const { date, isChangeable, onDateChange, ...rest } = props;

    const dateString: string = date.toString();


    const [isDatePickerVisible, setDatePickerVisible] = useState<boolean>(false);


    const handleDatePress = () => {
        if (! isChangeable) return;
        setDatePickerVisible(true);
    }

    const handleCancel = () => {
        setDatePickerVisible(false);
    }

    const handleConfirm = (date: Date) => {
        const localDate: LocalDate = LocalDate.of(date.getFullYear(), date.getMonth() + 1, date.getDate());
        onDateChange(localDate);
        setDatePickerVisible(false);
    }


    return (
        <View style={S.styles.view}>
            <TouchableOpacity onPress={handleDatePress}>
                <Text style={S.styles.date}>{dateString}</Text>
            </TouchableOpacity>
            <DateTimePickerModal 
                isVisible={isDatePickerVisible}
                mode="date"
                date={new Date(date.year(), date.monthValue() - 1, date.dayOfMonth())}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                style={S.styles.dateModal}
            />
        </View>
    );
};

export default DateInfo;