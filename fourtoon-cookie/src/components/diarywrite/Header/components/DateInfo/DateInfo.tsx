import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import * as S from "./DateInfo.styled";

export interface DateInfoProps {
    date: Date;
    onDateChange: (date: Date) => void;
}

const DateInfo = (props: DateInfoProps) => {
    const { date, onDateChange } = props;

    const [isDatePickerVisible, setDatePickerVisible] = useState<boolean>(false);

    const handleOpenPress = () => {
        setDatePickerVisible(true);
    }

    const handleCancel = () => {
        setDatePickerVisible(false);
    }

    const handleConfirm = (date: Date) => {
        onDateChange(date);
        setDatePickerVisible(false);
    }



    const dateString = date.getFullYear() + "." + date.getMonth() + "." + date.getDate();

    return (
        <View style={S.styles.view}>
            <TouchableOpacity onPress={handleOpenPress}>
                <View>
                    <Text style={S.styles.date}>{dateString}</Text>
                </View>
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