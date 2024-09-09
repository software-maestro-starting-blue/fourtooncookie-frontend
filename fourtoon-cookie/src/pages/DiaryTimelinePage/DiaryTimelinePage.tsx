import React, {useState, useEffect, useRef} from "react";
import {FlatList} from "react-native";
import Header from "./Header/Header";
import DiaryEmpty from "./DiaryEmpty/DiaryEmpty";
import {deleteDiary, getDiaries} from '../../apis/diary';
import type {Diary} from "../../types/diary";
import {GlobalErrorInfoType} from "../../types/error";
import DiaryComponent from "./DiaryComponent/DiaryComponent";
import MainPageLayout from "../../components/layout/MainPageLayout/MainPageLayout";
import handleError from "../../error/errorhandler";
import { FOOTER_STATE } from "../../components/layout/MainPageLayout/Footer/Footer";

enum LIST_STATUS {
    NONE, REFRESH, END_REACHED
}

const DiaryTimelinePage = () => {
    const [diaries, setDiaries] = useState<Diary[]>([]);
    const [listStatus, setListStatus] = useState(LIST_STATUS.NONE);
    const hasMoreRef = useRef(true);
    const pageRef = useRef(-1);

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
        if (!hasMoreRef.current) return;
        setListStatus(LIST_STATUS.END_REACHED);
    };

    const handleRefresh = async () => {
        pageRef.current = 0;
        hasMoreRef.current = true;
        setListStatus(LIST_STATUS.REFRESH);
    };

    useEffect(() => {

        const fetchDiaries = async (listStatus: LIST_STATUS) => {
            let currentDiaries = diaries;

            switch (listStatus) {
                case LIST_STATUS.NONE:
                    return;
                case LIST_STATUS.REFRESH:
                    pageRef.current = 0;
                    hasMoreRef.current = true;
                    currentDiaries = [];
                    break;
                case LIST_STATUS.END_REACHED:
                    pageRef.current++;
                    break;
            }

            const result = await getDiaries(pageRef.current);

            setDiaries([...currentDiaries, ...result]);

            if (result == null || result.length == 0) {
                hasMoreRef.current = false;
            }

            setListStatus(LIST_STATUS.NONE);
        }

        fetchDiaries(listStatus);

    }, [listStatus, diaries, pageRef, hasMoreRef]);

    return (
        <MainPageLayout footerState={FOOTER_STATE.HOME}>
            <FlatList
                data={diaries}
                keyExtractor={(item) => item.diaryId.toString()}
                renderItem={({item}) => <DiaryComponent diary={item} onDelete={() => handleDelete(item.diaryId)}/>}
                ListHeaderComponent={<Header/>}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.5}
                ListEmptyComponent={listStatus === LIST_STATUS.REFRESH ? null : <DiaryEmpty/>}
                contentContainerStyle={{paddingBottom: "25%"}}
                refreshing={listStatus === LIST_STATUS.REFRESH}
                onRefresh={handleRefresh}
            />
        </MainPageLayout>
    );
};

export default DiaryTimelinePage;