import { LocalDate } from "@js-joda/core";
import { createContext, useContext, useState } from "react";
import { useDiaryById } from "../../hooks/server/diary";

export interface DiaryWritePageContextType {
    currentDiaryId: number | undefined;
    diaryDate: LocalDate;
    content: string;

    setDiaryDate: (diaryDate: LocalDate) => void;
    setContent: (content: string) => void;
}

const defaultDiaryWritePageContext: DiaryWritePageContextType = {
    currentDiaryId: undefined,
    diaryDate: LocalDate.now(),
    content: "",

    setDiaryDate: () => {},
    setContent: () => {},
}

const DiaryWritePageContext = createContext<DiaryWritePageContextType>(defaultDiaryWritePageContext);

export interface DiaryWritePageProviderProps {
    currentDiaryId: number | undefined;
    children: React.ReactNode;
}

const DiaryWritePageProvider = (props: DiaryWritePageProviderProps) => {
    const { currentDiaryId, children } = props;

    const { data: currentDiary } = useDiaryById(currentDiaryId);

    const [diaryDate, setDiaryDate] = useState<LocalDate>(currentDiary ? currentDiary.diaryDate : LocalDate.now());
    const [content, setContent] = useState<string>(currentDiary ? currentDiary.content : "");

    return (
        <DiaryWritePageContext.Provider value={{currentDiaryId, diaryDate, content, setDiaryDate, setContent}}>
            {children}
        </DiaryWritePageContext.Provider>
    );
}

export default DiaryWritePageProvider;

export const useDiaryWritePageContext = () => {
    return useContext(DiaryWritePageContext);
}