import React from "react";
import { StyleSheet, View } from "react-native";
import { Diary, DiaryStatus } from "../../../types/diary";
import DiaryContentsLayout from "./DiaryContentsLayout";
import DiaryPaintingImagesLayout from "./DiaryPaintingImagesLayout";
import DiaryActionsLayout from "./DiaryActionsLayout";
import DiaryInfoLayout from "./DiaryInfoLayout";
import DiaryPaintingImageLoadingLayout from "./DiaryPaintingImageLoadingLayout";
import DiaryPaintingImageFailedLayout from "./DiaryPaintingImageFailedLayout";
import { useDiaryById } from "../../../hooks/server/diary";

export interface DiaryProps {
    diaryId: number,
}

const DiaryComponent = (props: DiaryProps) => {
    const { diaryId, ...rest } = props;
    const { data: diary } = useDiaryById(diaryId);

    if (!diary) return null;
    
    const { content, isFavorite, diaryDate, paintingImageUrls, characterId, diaryStatus } = diary;

    return (
        <View style={styles.container}>
            <DiaryInfoLayout
                diaryId={diaryId}
                characterId={diary.characterId}
                date={diaryDate}
            />
            <DiaryBody
                diaryStatus={diaryStatus}
                paintingImageUrls={paintingImageUrls}
                selectedCharacterId={characterId}
            />
            <DiaryContentsLayout
                content={content}
            />
            <DiaryActionsLayout
                diaryId={diaryId}
                isFavorite={isFavorite}
            />
        </View>
    );
};

export default DiaryComponent;

interface DiaryBodyProps {
    diaryStatus: DiaryStatus,
    paintingImageUrls: string[],
    selectedCharacterId: number,
}

const DiaryBody = (props: DiaryBodyProps) => {
    const { diaryStatus, paintingImageUrls, selectedCharacterId, ...rest } = props;

    switch(diaryStatus) {
        case DiaryStatus.IN_PROGRESS:
            return (
                <DiaryPaintingImageLoadingLayout 
                    selectedCharacterId={selectedCharacterId}
                />
            );
        
        case DiaryStatus.COMPLETED:
            if (paintingImageUrls.length === 4) {
                return (
                    <DiaryPaintingImagesLayout
                        imageUrls={paintingImageUrls}
                    />
                );
            }
    }

    return (
        <DiaryPaintingImageFailedLayout />
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 16,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        gap: 16,
        width: 'auto',
        height: 'auto',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
    },
    contents: {
        flexDirection: 'column',
        marginBottom: 10,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    likeImage: {
        width: 30,
        height: 30,
    },
    footerLikeButton: {
        flex: 1,
    },
    settingButtons: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'flex-end',
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});
