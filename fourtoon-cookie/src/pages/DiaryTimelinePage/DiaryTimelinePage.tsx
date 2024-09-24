import React, {useState, useEffect} from "react";
import {FlatList} from "react-native";
import Header from "./Header/Header";
import DiaryEmpty from "./DiaryEmpty/DiaryEmpty";
import DiaryComponent from "./DiaryComponent/DiaryComponent";
import MainPageLayout from "../../components/layout/MainPageLayout/MainPageLayout";
import { FOOTER_STATE } from "../../components/layout/MainPageLayout/Footer/Footer";
import { useDiaries } from "../../hooks/server/diary";
import { Diary } from "../../types/diary";
import { AccountStatus } from "../../types/account";
import { useAccountState } from "../../hooks/account";

enum LIST_STATUS {
    NONE, REFRESH, END_REACHED
}

const DiaryTimelinePage = () => {
    const [listStatus, setListStatus] = useState(LIST_STATUS.REFRESH);

    const { data, refetch, hasNextPage, fetchNextPage } = useDiaries();
    const diaryList: Diary[] = data?.pages?.flatMap(page => page) ?? [];
    const diaryListById: number[] = diaryList.map(diary => diary.diaryId);

    const { accountState } = useAccountState();

    const handleEndReached = async () => {
        setListStatus(LIST_STATUS.END_REACHED);
    };

    const handleRefresh = async () => {
        setListStatus(LIST_STATUS.REFRESH);
    };

    useEffect(() => {
        const fetchDiaries = async (listStatus: LIST_STATUS) => {
            switch (listStatus) {
                case LIST_STATUS.NONE:
                    return;
                case LIST_STATUS.REFRESH:
                    await refetch();
                    break;
                case LIST_STATUS.END_REACHED:
                    if (hasNextPage){
                        await fetchNextPage();
                    }
                    break;
            }

            setListStatus(LIST_STATUS.NONE);
        }

        if (accountState !== AccountStatus.LOGINED) return;

        fetchDiaries(listStatus);

    }, [listStatus, accountState]);

    return (
        <MainPageLayout footerState={FOOTER_STATE.HOME}>
            <FlatList
                data={diaryListById}
                keyExtractor={(item) => item.toString()}
                renderItem={({item}) => <DiaryComponent diaryId={item}/>}
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