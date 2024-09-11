import { create } from "zustand";
import { Diary } from "../types/diary";
import { deleteDiary, getDiaries, patchDiaryFavorite, postDiary, putDiary } from "../apis/diary";


interface DiaryListState {
    diaryList: Diary[];
    page: number;
    hasMore: boolean;

    loadFirstPage: () => Promise<void>;
    loadNextPage: () => Promise<void>;

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
            set({
                diaryList: [...diaryList, ...result],
                page: page + 1,
                hasMore: result.length > 0,
            });
        },

        getDiaryById: (diaryId: number): Diary | undefined => {
            const { diaryList } = get();
            return diaryList.find(diary => diary.diaryId === diaryId);
        },

        postDiary: async (diary: Diary) => {
            
            await postDiary(diary.characterId, diary.diaryDate, diary.content);

            const { diaryList } = get();
            await set({
                diaryList: [diary, ...diaryList],
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