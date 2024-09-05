import React, { useContext, useEffect, useState } from "react";
import {FlatList, RefreshControl, ScrollView} from "react-native";
import { debounce } from 'lodash';
import Header from "./Header/Header";
import DiaryEmpty from "./DiaryEmpty/DiaryEmpty";
import { deleteDiary, getDiaries } from '../../apis/diary';
import type { Diary } from "../../types/diary";
import { diaryDefaultImages } from "../../constants/diary";
import GlobalJwtTokenStateContext from "../../components/global/GlobalJwtToken/GlobalJwtTokenStateContext";
import GlobalErrorInfoStateContext from "../../components/global/GlobalError/GlobalErrorInfoStateContext";
import { GlobalErrorInfoType } from "../../types/error";
import DiaryComponent from "./DiaryComponent/DiaryComponent";
import MainPageLayout from "../../components/layout/MainPageLayout/MainPageLayout";

const DiaryTimelinePage = () => {
    const [diaries, setDiaries] = useState<Diary[]>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const jwtContext = useContext(GlobalJwtTokenStateContext);
    const { errorInfo, setErrorInfo } = useContext(GlobalErrorInfoStateContext);

    const loadDiaries = async () => {
        let result: Diary[];
        try {
            result = await getDiaries(page, jwtContext);

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
                setErrorInfo({
                    type: GlobalErrorInfoType.MODAL,
                    error: error
                });
            }
        }
    };

    useEffect(() => {
        if (! hasMore) return;

        loadDiaries();
    }, [hasMore, page, jwtContext]);

    const handleEndReached = debounce(() => {
        if (hasMore) {
            setPage(prevPage => prevPage + 1);
        }
    }, 300); // 300ms 디바운스 타임

    const handleDelete = async (diaryId: number) => {
        try {
            await deleteDiary(diaryId, jwtContext);
            setDiaries(prevDiaries => prevDiaries.filter(diary => diary.diaryId !== diaryId));
        } catch (error) {
            if (error instanceof Error) {
                setErrorInfo({
                    type: GlobalErrorInfoType.MODAL,
                    error: error
                });
            }
        }
    }

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        // 데이터 최신화 로직 실행
        setTimeout(() => {
            loadDiaries();
            console.log('데이터 최신화 됨')
            setRefreshing(false);
        }, 2000);
    };
    return (
        <MainPageLayout isHomeActivate={true} isPersonActivate={false}>
            <ScrollView
                contentContainerStyle={{ flex: 1 }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
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
            </ScrollView>
        </MainPageLayout>
    );
};

export default DiaryTimelinePage;
