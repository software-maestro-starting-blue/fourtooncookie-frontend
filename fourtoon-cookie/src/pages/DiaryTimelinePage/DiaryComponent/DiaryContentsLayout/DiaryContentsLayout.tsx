import DiaryHashtag from "./DiaryHashtag/DiaryHashtag";
import React from "react";
import DiaryDate from "./DiaryDate/DiaryDate";
import DiaryContent from "./DiaryContent/DiaryContent";
import { LocalDateTime } from "@js-joda/core";
import { View } from "react-native";


export interface DiaryContentsLayoutProps {
    hashtagIds: number[],
    content: string,
    diaryDate: Date,
}

const DiaryContentsLayout = (props: DiaryContentsLayoutProps) => {
    const { hashtagIds, content, diaryDate } = props;

    return (
        <View>
            <DiaryHashtag hashtagIds={hashtagIds}/>
            <DiaryContent content={content}/>
            <DiaryDate diaryDate={diaryDate} />
        </View>
    );
}

export default DiaryContentsLayout;