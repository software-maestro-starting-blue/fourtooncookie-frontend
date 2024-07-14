import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import * as S from "./DateInfo.styled";
import DateTimePickerModal from 'react-native-modal-datetime-picker';

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

    const handleCancle = () => {
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
                onConfirm={handleConfirm}
                onCancel={handleCancle}
            />
        </View>
    );
};

export default DateInfo;