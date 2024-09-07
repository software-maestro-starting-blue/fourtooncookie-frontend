import React, { useContext, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { debounce } from 'lodash';
import Footer from "../../components/common/Footer/Footer";
import Header from "./Header/Header";
import DiaryEmpty from "./DiaryEmpty/DiaryEmpty";
import * as S from './DiaryTimelinePage.styled';
import { deleteDiary, getDiaries } from '../../apis/diary';
import type { Diary } from "../../types/diary";
import { diaryDefaultImages } from "../../constants/diary";
import { GlobalErrorInfoType } from "../../types/error";
import DiaryComponent from "./DiaryComponent/DiaryComponent";
import MainPageLayout from "../../components/layout/MainPageLayout/MainPageLayout";
import handleError from "../../error/errorhandler";

const DiaryTimelinePage = () => {
    const [diaries, setDiaries] = useState<Diary[]>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        if (! hasMore) return;

        const loadDiaries = async () => {
            let result: Diary[];
            try {
                result = await getDiaries(page);

                if (result.length == 0) {
                    setHasMore(false);
                } else {
                    result = result.map(diary => ({
                        ...diary,
                        paintingImageUrls: diary.paintingImageUrls.length ? diary.paintingImageUrls : diaryDefaultImages
                    }));
    
                    setDiaries(prev => 
                        [...prev, ...result]);
                }
            } catch (error) {
                result = [];
                if (error instanceof Error) {
                    handleError(
                        error,
                        GlobalErrorInfoType.ALERT
                    );
                }
            }
        };

        loadDiaries();
    }, [hasMore, page]);

    const handleEndReached = debounce(() => {
        if (hasMore) {
            setPage(prevPage => prevPage + 1);
        }
    }, 300); // 300ms 디바운스 타임

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

    return (
        <MainPageLayout isHomeActivate={true} isPersonActivate={false}>
            <FlatList
                data={diaries}
                keyExtractor={item => item.diaryId.toString()}
                renderItem={({ item }) => <DiaryComponent diary={item} onDelete={() => handleDelete(item.diaryId)} />}
                ListHeaderComponent={<Header />}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.5}
                ListEmptyComponent={<DiaryEmpty/>}
                contentContainerStyle={{ paddingBottom: "25%" }}
            />
        </MainPageLayout>
    );
};

export default DiaryTimelinePage;
