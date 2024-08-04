import DiaryHashtag from "./DiaryHashtag/DiaryHashtag";
import React from "react";
import DiaryDate from "./DiaryDate/DiaryDate";
import DiaryContent from "./DiaryContent/DiaryContent";
import { LocalDate, LocalDateTime } from "@js-joda/core";
import { View } from "react-native";


export interface DiaryContentsLayoutProps {
    content: string,
}

const DiaryContentsLayout = (props: DiaryContentsLayoutProps) => {
    const { content } = props;

    return (
        <View>
            <DiaryContent content={content}/>
        </View>
    );
}

export default DiaryContentsLayout;