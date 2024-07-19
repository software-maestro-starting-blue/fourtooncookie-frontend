import React from "react";
import { View, Text } from "react-native";
import * as S from './DiaryDate.styld';

interface DiaryDateProps {
    diaryDate: Date;
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
