import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "react-query"
import { deleteDiary, getDiaries, postDiary, putDiary } from "../../apis/diary"
import { Diary } from "../../types/diary";


export const useDiaries = () => {
    const queryClient = useQueryClient();

    return useInfiniteQuery("diaries", 
        ({ pageParam = 0 }) => {
            return getDiaries(pageParam)
        }, 
        {
            getNextPageParam: (lastPage, allPages) => {
                if (lastPage.length < 10) {
                    return false
                }
                return allPages.length
            },
            onSuccess: (data) => {
                data.pages.forEach((page) => {
                    page.forEach((diary) => {
                        queryClient.setQueryData(["diary", diary.diaryId], diary)
                    })
                });
            }
        }
    );
}

export const useDiaryById = (diaryId: number) => {
    const queryClient = useQueryClient();

    return queryClient.getQueryData(["diary", diaryId]);
}

export const useCreateDiary = () => {
    const queryClient = useQueryClient();

    return useMutation("diaries", (diary: Diary) => {
        return postDiary(diary.characterId, diary.diaryDate, diary.content);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries("diaries");
        }
    });
}

export const useUpdateDiary = () => {
    const queryClient = useQueryClient();

    return useMutation("diaries", (diary: Diary) => {
        return putDiary(diary.characterId, diary.diaryId, diary.content);
    }, {
        onSuccess: (_, diary) => {
            queryClient.removeQueries(["diary", diary.diaryId], { exact: true });
            queryClient.invalidateQueries("diaries");
        }
    });
}

export const useDeleteDiary = () => {
    const queryClient = useQueryClient();

    return useMutation("diaries", (diaryId: number) => {
        return deleteDiary(diaryId);
    }, {
        onSuccess: (_, diaryId) => {
            queryClient.removeQueries(["diary", diaryId], { exact: true });
            queryClient.invalidateQueries("diaries");
        }
    });
}