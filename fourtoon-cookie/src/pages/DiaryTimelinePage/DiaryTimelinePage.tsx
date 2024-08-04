import React, { useContext, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { debounce } from 'lodash';
import DiaryLayout from "./DiaryComponent/DiaryComponent";
import Footer from "../../components/common/Footer/Footer";
import Header from "../../components/common/Header/Header";
import DiaryEmpty from "./DiaryEmpty/DiaryEmpty";
import * as S from './DiaryTimelinePage.styled';
import { deleteDiary, getDiaries } from '../../apis/diary';
import type { Diary } from "../../types/diary";
import { diaryDefaultImages } from "../../constants/diary";
import GlobalJwtTokenStateContext from "../../components/global/GlobalJwtToken/GlobalJwtTokenStateContext";
import GlobalErrorInfoStateContext from "../../components/global/GlobalError/GlobalErrorInfoStateContext";
import { GlobalErrorInfoType } from "../../types/error";

const DiaryTimelinePage = () => {
    const [diaries, setDiaries] = useState<Diary[]>([]);
    const [page, setPage] = useState(0);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const jwtContext = useContext(GlobalJwtTokenStateContext);
    const { errorInfo, setErrorInfo } = useContext(GlobalErrorInfoStateContext);

    useEffect(() => {
        const loadDiaries = async () => {
            if (isLoadingMore) return;
            if (! hasMore) return;

            setIsLoadingMore(true);
            let result: Diary[];
            try {
                result = await getDiaries(page, jwtContext); // TODO 1대신 멤버 ID 
            } catch (error) {
                result = [];
                setErrorInfo({
                    type: GlobalErrorInfoType.MODAL,
                    message: "일기 목록을 불러오는 중 오류가 발생했습니다."
                });
            }

            if (result.length === 0) {
                setHasMore(false);
            } else {
                result = result.map(diary => ({
                    ...diary,
                    paintingImageUrls: diary.paintingImageUrls.length ? diary.paintingImageUrls : diaryDefaultImages
                }));

                setDiaries(prev => 
                    [...prev, ...result]);
            }

            setIsLoadingMore(false);
        };

        loadDiaries();
    }, [page]);

    const handleEndReached = debounce(() => {
        if (hasMore && !isLoadingMore) {
            setPage(prevPage => prevPage + 1);
        }
    }, 300); // 300ms 디바운스 타임

    const handleDelete = async (diaryId: number) => {
        try {
            await deleteDiary(diaryId, jwtContext);
            setDiaries(prevDiaries => prevDiaries.filter(diary => diary.diaryId !== diaryId));
        } catch (error) {
            setErrorInfo({
                type: GlobalErrorInfoType.MODAL,
                message: "일기 삭제 중 오류가 발생했습니다."
            });
        }
    }

    return (
        <SafeAreaView style={S.styles.container}>
            <FlatList
                data={diaries}
                renderItem={({ item }) => <DiaryLayout diary={item} onDelete={() => handleDelete(item.diaryId)} />}
                ListHeaderComponent={<Header />}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.5}
                contentContainerStyle={{flexGrow: 1}}
                ListEmptyComponent={<DiaryEmpty/>}
            />
            <Footer />
        </SafeAreaView>
    );
};

export default DiaryTimelinePage;
