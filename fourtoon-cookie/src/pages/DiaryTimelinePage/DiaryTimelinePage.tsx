import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { debounce } from 'lodash';
import Diary from "../../components/Diary/Diary/Diary";
import Footer from "../../components/common/Footer/Footer";
import Header from "../../components/common/Header/Header";
import DiaryEmpty from "../../components/Diary/DiaryEmpty/DiaryEmpty";
import * as S from './DiaryTimelinePage.styled';
import { LocalDateTime } from "@js-joda/core";
import { getDiaries, deleteDiary, toggleDiaryFavorite } from '../../apis/diaryApi';

export interface DiarySavedResponse {
    diaryId: number,
    content: string,
    isFavorite: boolean,
    diaryDate: LocalDateTime,
    paintingImageUrls: string[],
    hashtagIds: number[],
    characterId: number
}

const DiaryTimelinePage = () => {
    const [diaries, setDiaries] = useState<DiarySavedResponse[]>([]);
    const [page, setPage] = useState(0);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const loadDiaries = async () => {
            if (!isLoadingMore && hasMore) {
                setIsLoadingMore(true);
                const result = await getDiaries(page);
                if (result === null) {
                    setHasMore(false);
                } else {
                    setDiaries(prev => [...prev, ...result]);
                }
                setIsLoadingMore(false);
            }
        };
        loadDiaries();
    }, [page]);

    const loadMoreData = debounce(() => {
        if (hasMore && !isLoadingMore) {
            setPage(prevPage => prevPage + 1);
        }
    }, 300); // 300ms 디바운스 타임

    const handleDelete = (diaryId: number) => {
        setDiaries(prevDiaries => prevDiaries.filter(diary => diary.diaryId !== diaryId));
    };

    return (
        <SafeAreaView style={S.styles.container}>
            <FlatList
                data={diaries}
                renderItem={({ item }) => <Diary {...item} onDelete={handleDelete} />}
                ListHeaderComponent={<Header />}
                onEndReached={loadMoreData}
                onEndReachedThreshold={0.5}
                contentContainerStyle={{flexGrow: 1}}
                ListEmptyComponent={<DiaryEmpty/>}
            />
            <Footer />
        </SafeAreaView>
    );
};

export default DiaryTimelinePage;
