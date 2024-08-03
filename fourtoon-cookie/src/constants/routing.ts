import { Diary } from "../types/diary"

export type RootStackParamList = {
    DiaryTimelinePage: undefined,
    DiaryWritePage: {
        diary?: Diary
        isEdit?: boolean,
    },
    CharacterSelectPage: undefined,
    IntroPage: undefined,
    SignUpPage: undefined,
}
