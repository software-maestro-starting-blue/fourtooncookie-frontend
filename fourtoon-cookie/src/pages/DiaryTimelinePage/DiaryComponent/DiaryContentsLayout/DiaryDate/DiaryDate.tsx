import React from "react";
import { View, Text } from "react-native";
import * as S from './DiaryDate.styld';
import { LocalDate } from "@js-joda/core";

interface DiaryDateProps {
    diaryDate: LocalDate;
}

const Date = (props: DiaryDateProps) => {
    const {diaryDate, ...rest} = props;

    return (
        <View style={S.styles.date}>
            <Text>{diaryDate.toString()}</Text>
        </View>
    );
};

export default Date;
