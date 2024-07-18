import React, { useState } from "react";
import { View, Text } from "react-native";
import Button from "../../common/Button/Button";
import * as S from './DiaryContent.styled';

export interface DiaryContentProps {
    content: string;
}

const DiaryContent = (props: DiaryContentProps) => {
    const { content, ...rest } = props;
    const [isExpanded, setIsExpanded] = useState(false);

    const previewWordCount = 50;
    const previewLines = 4;

    const shouldShowReadMore = content.length > previewWordCount || content.split("\n").length > previewLines;

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <View>
            <Text numberOfLines={isExpanded ? content.split("\n").length : previewLines}>
                {isExpanded ? content : content.slice(0, previewWordCount)}
                {!isExpanded && content.length > previewWordCount && '...'}
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
