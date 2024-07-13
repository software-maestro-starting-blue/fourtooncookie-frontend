import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import * as S from "./DateInfo.styled";

export interface DateInfoProps {
    date: Date;
    onDateChange: (date: Date) => void;
}

const DateInfo = (props: DateInfoProps) => {
    const { date, onDateChange } = props;

    const handlePress = () => {
        // TODO: Date 변화에 대해 handling 후 onDateChange 호출
    }

    const dateString = date.getFullYear() + "." + date.getMonth() + "." + date.getDate();

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={S.styles.date}>{dateString}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default DateInfo;