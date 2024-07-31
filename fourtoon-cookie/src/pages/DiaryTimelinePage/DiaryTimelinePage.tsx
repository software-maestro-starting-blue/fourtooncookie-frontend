import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { debounce } from 'lodash';
import DiaryLayout from "./DiaryLayout/DiaryLayout";
import Footer from "../../components/common/Footer/Footer";
import Header from "../../components/common/Header/Header";
import DiaryEmpty from "./DiaryEmpty/DiaryEmpty";
import * as S from './DiaryTimelinePage.styled';
import { getDiaries } from '../../apis/diary';
import type { Diary } from "../../types/diary";

const DiaryTimelinePage = () => {
    const [diaries, setDiaries] = useState<Diary[]>([]);
    const [page, setPage] = useState(0);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const loadDiaries = async () => {
            if (!isLoadingMore && hasMore) {
                setIsLoadingMore(true);
                const result = await getDiaries(page, "1"); // TODO 1대신 멤버 ID 
                if (result === null) {
                    setHasMore(false);
                } else {
                    setDiaries(prev => 
                        [...prev, ...result.map(diary => ({
                            ...diary,
                            paintingImageUrls: 
                                diary.paintingImageUrls.length ? diary.paintingImageUrls : diaryDefaultImages
                    }))]);
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
                renderItem={({ item }) => <DiaryLayout diary={item} onDelete={handleDelete} />}
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
