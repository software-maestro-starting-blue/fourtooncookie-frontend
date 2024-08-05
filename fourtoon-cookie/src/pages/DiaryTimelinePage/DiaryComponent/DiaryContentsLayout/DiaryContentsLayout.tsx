import React from "react";
import DiaryContent from "./DiaryContent/DiaryContent";
import { LocalDate, LocalDateTime } from "@js-joda/core";
import { View } from "react-native";
import * as S from "./DiaryContentsLayout.styled";


export interface DiaryContentsLayoutProps {
    content: string,
}

const DiaryContentsLayout = (props: DiaryContentsLayoutProps) => {
    const { content } = props;

    return (
        <View style={S.styles.layout}>
            <DiaryContent content={content}/>
        </View>
    );
}

export default DiaryContentsLayout;