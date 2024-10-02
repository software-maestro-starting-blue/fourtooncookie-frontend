import React, { useState } from "react";
import { Text, View } from "react-native";
import * as S from "./DiaryContentsLayout.styled";
import Button from "../../../../components/common/Button/Button";
import { diaryContentPreviewLines, diaryContentPreviewWordCount } from "../../../../config/diary";
import { useFunctionWithErrorHandling } from "../../../../hooks/error";


export interface DiaryContentsLayoutProps {
    content: string,
}

const DiaryContentsLayout = (props: DiaryContentsLayoutProps) => {
    const { content, ...rest } = props;
    const [isExpanded, setIsExpanded] = useState(false);

    const { functionWithErrorHandling } = useFunctionWithErrorHandling();

    const shouldShowReadMore = content.length > diaryContentPreviewWordCount || content.split("\n").length > diaryContentPreviewLines;

    const handleToggleExpand = functionWithErrorHandling(() => {
        setIsExpanded(!isExpanded);
    });

    return (
        <View style={S.styles.layout}>
            <View style={S.styles.container}>
                <Text style={S.styles.content} numberOfLines={isExpanded ? diaryContentPreviewLines : content.split("\n").length}>
                    {isExpanded ? content : content.slice(0, diaryContentPreviewWordCount)}
                    {!isExpanded && content.length > diaryContentPreviewWordCount && '...'}
                </Text>
                {shouldShowReadMore && (
                    <Button
                        title={isExpanded ? "간단히 보기" : "더보기"}
                        onPress={handleToggleExpand}
                        style={S.styles.more}
                        textStyle={S.styles.moreText}
                    />
                )}
            </View>
        </View>
    );
}

export default DiaryContentsLayout;