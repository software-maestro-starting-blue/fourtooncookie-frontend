import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import * as S from "./DateInfo.styled";

export interface DateInfoProps {
    date: Date;
    isChangeable: boolean;
    onDateChange: (date: Date) => void;
}

const DateInfo = (props: DateInfoProps) => {
    const { date, isChangeable, onDateChange, ...rest } = props;

    const dateString: string = date.getFullYear() + "." + date.getMonth() + "." + date.getDate();


    const [isDatePickerVisible, setDatePickerVisible] = useState<boolean>(false);


    const handleOpenPress = () => {
        if (! isChangeable) return;
        setDatePickerVisible(true);
    }

    const handleCancel = () => {
        setDatePickerVisible(false);
    }

    const handleConfirm = (date: Date) => {
        onDateChange(date);
        setDatePickerVisible(false);
    }


    return (
        <View style={S.styles.view}>
            <TouchableOpacity onPress={handleOpenPress}>
                <Text style={S.styles.date}>{dateString}</Text>
            </TouchableOpacity>
            <DateTimePickerModal 
                isVisible={isDatePickerVisible}
                mode="date"
                date={date}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                style={S.styles.dateModal}
            />
        </View>
    );
};

export default DateInfo;