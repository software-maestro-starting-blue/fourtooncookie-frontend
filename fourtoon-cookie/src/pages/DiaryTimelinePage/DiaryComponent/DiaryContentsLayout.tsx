import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../../../components/common/Button";
import { diaryContentPreviewLines, diaryContentPreviewWordCount } from "../../../config/diary";
import { useFunctionWithErrorHandling } from "../../../hooks/error";
import { useTranslationWithParentName } from "../../../hooks/locale";


export interface DiaryContentsLayoutProps {
    content: string,
}

const DiaryContentsLayout = (props: DiaryContentsLayoutProps) => {
    const { content, ...rest } = props;
    const [isExpanded, setIsExpanded] = useState(false);

    const { functionWithErrorHandling } = useFunctionWithErrorHandling();

    const t = useTranslationWithParentName("pages.diaryTimelinePage.diaryComponent.diaryContentsLayout");

    const shouldShowReadMore = content.length > diaryContentPreviewWordCount || content.split("\n").length > diaryContentPreviewLines;

    const handleToggleExpand = functionWithErrorHandling(() => {
        setIsExpanded(!isExpanded);
    });

    return (
        <View style={styles.layout}>
            <View style={styles.container}>
                <Text style={styles.content} numberOfLines={isExpanded ? diaryContentPreviewLines : content.split("\n").length}>
                    {isExpanded ? content : content.slice(0, diaryContentPreviewWordCount)}
                    {!isExpanded && content.length > diaryContentPreviewWordCount && '...'}
                </Text>
                {shouldShowReadMore && (
                    <Button
                        title={isExpanded ? t("briefView") : t("readMore")}
                        onPress={handleToggleExpand}
                        style={styles.more}
                        textStyle={styles.moreText}
                    />
                )}
            </View>
        </View>
    );
}

export default DiaryContentsLayout;

const styles = StyleSheet.create({
    layout: {
        marginTop: 15
    },
    container: {
        marginLeft: 20,
        fontSize: 30,
    },
    content: {
        fontSize: 15,
        fontStyle: 'normal'
    },
    button: {
        padding: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: 'gray',
        textAlign: 'center',
        marginLeft: 5,
    },
    more: {
        backgroundColor: 'white',
    },
    moreText: {
        color: 'gray',
    },
});