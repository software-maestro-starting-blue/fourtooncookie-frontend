import React from "react";
import { View, Text } from "react-native";
import { LocalDateTime } from "@js-joda/core";
import * as S from './DiaryDate.styld';

interface DiaryDateProps {
    diaryDate: LocalDateTime;
}

const Date = (props: DiaryDateProps) => {
    const {diaryDate, ...rest} = props;

    return (
        <View style={S.styles.date}>
            <Text>{diaryDate.toString().slice(0, 10)}</Text>
        </View>
    );
};

export default Date;
