import React from 'react';
import { Text, View } from 'react-native';
import * as S from "./DateInfo.styled";

export interface DateInfoProps {
    date: Date;
    onPress: (date: Date) => void;
}

const DateInfo = (props: DateInfoProps) => {
    const { date, onPress } = props;

    return (
        <View style={{ flexDirection: 'row' }}>
            <Text style={S.styles.date}>{date.toDateString()}</Text>
        </View>
    );
};

export default DateInfo;