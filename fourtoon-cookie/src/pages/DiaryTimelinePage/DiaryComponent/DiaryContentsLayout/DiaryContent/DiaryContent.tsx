import React, { useState } from "react";
import { View, Text } from "react-native";
import Button from "../../../../../components/common/Button/Button";
import * as S from './DiaryContent.styled';
import { diaryContentPreviewLines, diaryContentPreviewWordCount } from "../../../../../constants/diary";

export interface DiaryContentProps {
    content: string;
}

const DiaryContent = (props: DiaryContentProps) => {
    const { content, ...rest } = props;
    const [isExpanded, setIsExpanded] = useState(false);

    const shouldShowReadMore = content.length > diaryContentPreviewWordCount || content.split("\n").length > diaryContentPreviewLines;

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <View style={S.styles.container}>
            <Text numberOfLines={isExpanded ? content.split("\n").length : diaryContentPreviewLines}>
                {isExpanded ? content : content.slice(0, diaryContentPreviewWordCount)}
                {!isExpanded && content.length > diaryContentPreviewWordCount && '...'}
            </Text>
            {shouldShowReadMore && (
                <Button
                    title={isExpanded ? "간단히 보기" : "더 보기"}
                    onPress={handleToggleExpand}
                    style={S.styles.more}
                    textStyle={S.styles.moreText}
                />
            )}
        </View>
    );
};

export default DiaryContent;
