import { create } from "zustand";
import { Diary, DiaryStatus } from "../types/diary";
import { deleteDiary, getDiaries, patchDiaryFavorite, postDiary, putDiary } from "../apis/diary";


interface DiaryListState {
    diaryList: Diary[];
    page: number;
    hasMore: boolean;

    loadFirstPage: () => Promise<void>;
    loadNextPage: () => Promise<void>;
    emptyDiaryList: () => void;

    getDiaryById: (diaryId: number) => Diary | undefined;
    postDiary: (diary: Diary) => Promise<void>;
    deleteDiaryById: (diaryId: number) => Promise<void>;
    updateDiary: (diary: Diary) => Promise<void>;
    toggleFavoriteDiary: (diaryId: number) => Promise<void>;
}

export const useDiaryListStore = create<DiaryListState>(
    (set, get) => ({
        diaryList: [],
        page: -1,
        hasMore: true,

        loadFirstPage: async () => {
            const result = await getDiaries(0);
            set({
                diaryList: result,
                page: 0,
                hasMore: result.length > 0,
            });
        },
        
        loadNextPage: async () => {
            const { diaryList, page, hasMore } = get();

            if (!hasMore) return;

            const result = await getDiaries(page + 1);
            const newDiaryList = [...diaryList, ...result];
            newDiaryList.sort((a, b) => b.diaryDate.compareTo(a.diaryDate));
            set({
                diaryList: newDiaryList,
                page: page + 1,
                hasMore: result.length > 0,
            });
        },

        emptyDiaryList: () => {
            set({
                diaryList: [],
                page: -1,
                hasMore: true,
            });
        },

        getDiaryById: (diaryId: number): Diary | undefined => {
            const { diaryList } = get();
            return diaryList.find(diary => diary.diaryId === diaryId);
        },

        postDiary: async (diary: Diary) => {
            
            const diaryId: number = await postDiary(diary.characterId, diary.diaryDate, diary.content);

            diary.diaryId = diaryId;
            diary.diaryStatus = DiaryStatus.IN_PROGRESS;

            const { diaryList } = get();
            
            const newDiaryList = [diary, ...diaryList];
            newDiaryList.sort((a, b) => b.diaryDate.compareTo(a.diaryDate));
            await set({
                diaryList: newDiaryList,
            });
        },

        deleteDiaryById: async (diaryId: number) => {
            await deleteDiary(diaryId);

            const { diaryList } = get();
            await set({
                diaryList: diaryList.filter(diary => diary.diaryId !== diaryId)
            });
        },

        updateDiary: async (diary: Diary) => {
            await putDiary(diary.characterId, diary.diaryId, diary.content);

            const { diaryList } = get();
            await set({
                diaryList: diaryList.map(currentDiary => currentDiary.diaryId === diary.diaryId ? diary : currentDiary),
            });
        },

        toggleFavoriteDiary: async (diaryId: number) => {
            await patchDiaryFavorite(diaryId, !get().getDiaryById(diaryId)?.isFavorite);

            const { diaryList } = get();
            await set({
                diaryList: diaryList.map(
                    currentDiary => 
                        currentDiary.diaryId === diaryId ? 
                            { ...currentDiary, isFavorite: !currentDiary.isFavorite } : currentDiary
                ),
            });
        },

    })
)