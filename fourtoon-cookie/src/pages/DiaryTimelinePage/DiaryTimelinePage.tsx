import React, {useState, useEffect} from "react";
import {FlatList} from "react-native";
import Header from "./Header/Header";
import DiaryEmpty from "./DiaryEmpty/DiaryEmpty";
import {GlobalErrorInfoType} from "../../types/error";
import DiaryComponent from "./DiaryComponent/DiaryComponent";
import MainPageLayout from "../../components/layout/MainPageLayout/MainPageLayout";
import handleError from "../../error/errorhandler";
import { FOOTER_STATE } from "../../components/layout/MainPageLayout/Footer/Footer";
import { useDiaryListStore } from "../../store/diaryList";
import { useEffectWithAccountStatus } from "../../hooks/account";
import { AccountStatus } from "../../types/account";

enum LIST_STATUS {
    NONE, REFRESH, END_REACHED
}

const DiaryTimelinePage = () => {
    const [listStatus, setListStatus] = useState(LIST_STATUS.REFRESH);

    const { diaryList, loadFirstPage, loadNextPage, deleteDiaryById } = useDiaryListStore();

    const handleDelete = async (diaryId: number) => {
        try {
            deleteDiaryById(diaryId);
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
        setListStatus(LIST_STATUS.END_REACHED);
    };

    const handleRefresh = async () => {
        setListStatus(LIST_STATUS.REFRESH);
    };

    useEffectWithAccountStatus((accountStatus: AccountStatus) => {
        const fetchDiaries = async (listStatus: LIST_STATUS) => {
            switch (listStatus) {
                case LIST_STATUS.NONE:
                    return;
                case LIST_STATUS.REFRESH:
                    await loadFirstPage();
                    break;
                case LIST_STATUS.END_REACHED:
                    await loadNextPage();
                    break;
            }

            setListStatus(LIST_STATUS.NONE);
        }

        if (accountStatus !== AccountStatus.LOGINED) return;

        fetchDiaries(listStatus);

    }, [listStatus]);

    return (
        <MainPageLayout footerState={FOOTER_STATE.HOME}>
            <FlatList
                data={diaryList}
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