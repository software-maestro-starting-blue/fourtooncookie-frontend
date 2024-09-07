import React, {useState, useEffect} from "react";
import {FlatList} from "react-native";
import Header from "./Header/Header";
import DiaryEmpty from "./DiaryEmpty/DiaryEmpty";
import {deleteDiary, getDiaries} from '../../apis/diary';
import type {Diary} from "../../types/diary";
import {diaryDefaultImages} from "../../constants/diary";
import {GlobalErrorInfoType} from "../../types/error";
import DiaryComponent from "./DiaryComponent/DiaryComponent";
import MainPageLayout from "../../components/layout/MainPageLayout/MainPageLayout";
import handleError from "../../error/errorhandler";

const DiaryTimelinePage = () => {
    const [diaries, setDiaries] = useState<Diary[]>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [reached, setReached] = useState(false);

    const loadDiaries = async () => {
        const result = await getDiaries(page);

        return result.map(diary => ({
            ...diary,
            paintingImageUrls: diary.paintingImageUrls.length ? diary.paintingImageUrls : diaryDefaultImages
        }));
    };

    const handleDelete = async (diaryId: number) => {
        try {
            await deleteDiary(diaryId);
            setDiaries(prevDiaries => prevDiaries.filter(diary => diary.diaryId !== diaryId));
        } catch (error) {
            if (error instanceof Error) {
                handleError(
                    error,
                    GlobalErrorInfoType.ALERT
                );
            }
        }
    }

    const handleEndReached = async () => {
        if (hasMore) {
            setReached(true);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        setPage(0);
        setHasMore(true);
    };

    useEffect(() => {
        const fetchDiaries = async () => {
            if (refreshing && page === 0) {
                const result = await loadDiaries();
                if (result != null) {
                    setDiaries(result);
                }
                setRefreshing(false);
                setPage(1);
                setHasMore(true);
            }
        };

        if (refreshing) {
            fetchDiaries();
        }
    }, [refreshing, page]);

    useEffect(() => {
        const fetchDiaries = async () => {
            if (reached && hasMore) {
                const result = await loadDiaries();
                if (result != null && result.length > 0) {
                    setDiaries(prevDiaries => [...prevDiaries, ...result]);
                    setPage(prevPage => prevPage + 1);
                } else {
                    setHasMore(false);
                }
                setReached(false);
            }
        };

        if (reached) {
            fetchDiaries();
        }
    }, [reached]);

    return (
        <MainPageLayout isHomeActivate={true} isPersonActivate={false}>
            <FlatList
                data={diaries}
                keyExtractor={(item) => item.diaryId.toString()}
                renderItem={({item}) => <DiaryComponent diary={item} onDelete={() => handleDelete(item.diaryId)}/>}
                ListHeaderComponent={<Header/>}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.5}
                ListEmptyComponent={refreshing ? null : <DiaryEmpty/>}
                contentContainerStyle={{paddingBottom: "25%"}}
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
        </MainPageLayout>
    );
};

export default DiaryTimelinePage;