import { Diary } from "../types/diary"

export type RootStackParamList = {
    App: {

    },
    DiaryTimelinePage: {
        
    },
    DiaryWritePage: {
        diary: Diary
        isEdit?: boolean,
    },
} // TODO 다른 페이지에 대한 내용도 추가해야 함