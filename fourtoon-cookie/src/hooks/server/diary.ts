import { useQueryClient } from "react-query"
import { deleteDiary, getDiaries, getDiary, patchDiaryFavorite, postDiary, putDiary } from "../../apis/diary"
import { Diary } from "../../types/diary";
import { useAccountState } from "../account";
import { AccountStatus } from "../../types/account";
import { JwtError } from "../../error/JwtError";
import { useEffectWithErrorHandling, useInfiniteQueryWithErrorHandling, useMutationWithErrorHandling, useQueryWithErrorHandling } from "../error";


export const useDiaries = () => {
    const queryClient = useQueryClient();
    const { accountState } = useAccountState();

    useEffectWithErrorHandling(() => {
        if (accountState == AccountStatus.LOGINED) return;

        queryClient.invalidateQueries("diaries");
    }, [accountState, queryClient]);


    return useInfiniteQueryWithErrorHandling("diaries", 
        async ({ pageParam = 0 }) => {
            return await getDiaries(pageParam);
        }, 
        {
            enabled: accountState === AccountStatus.LOGINED,
            retry: false,
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
            },
            onError: (error: Error) => {
                if (error instanceof JwtError) {
                    queryClient.cancelQueries("diaries");
                    queryClient.removeQueries("diaries");
                }
            }
        }
    );
}

export const useDiaryById = (diaryId: number | undefined) => {
    const queryClient = useQueryClient();
    const { accountState } = useAccountState();

    useEffectWithErrorHandling(() => {
        if (accountState == AccountStatus.LOGINED) return;

        queryClient.invalidateQueries(["diary", diaryId], { exact: true });
    }, [accountState, diaryId, queryClient]);

    return useQueryWithErrorHandling(["diary", diaryId], () => {
        if (!diaryId) return;
        return getDiary(diaryId);
    }, {
        initialData: () => queryClient.getQueryData(["diary", diaryId]),
        enabled: accountState === AccountStatus.LOGINED,
        retry: false,
        onError: (error: Error) => {
            if (error instanceof JwtError) {
                queryClient.cancelQueries(["diary", diaryId], { exact: true });
                queryClient.removeQueries(["diary", diaryId], { exact: true });
            }
        }
    });
}

export const useCreateDiary = () => {
    const queryClient = useQueryClient();

    return useMutationWithErrorHandling((diary: Diary) => {
        return postDiary(diary.characterId, diary.diaryDate, diary.content);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries("diaries");
        }
    });
}

export const useUpdateDiary = () => {
    const queryClient = useQueryClient();

    return useMutationWithErrorHandling((diary: Diary) => {
        return putDiary(diary.characterId, diary.diaryId, diary.content);
    }, {
        onSuccess: (_, diary) => {
            queryClient.invalidateQueries(["diary", diary.diaryId], { exact: true });
            queryClient.invalidateQueries("diaries");
        }
    });
}

export const useUpdateDiaryFavorite = (diaryId: number) => {
    const queryClient = useQueryClient();

    return useMutationWithErrorHandling((isFavorite: boolean) => {
        return patchDiaryFavorite(diaryId, isFavorite);
    }, {
        onSuccess: (_, isFavorite: boolean) => {
            const diary: Diary | undefined = queryClient.getQueryData(["diary", diaryId]);
            if (!diary) return;
            queryClient.setQueryData(["diary", diaryId], {
                ...diary,
                isFavorite: isFavorite
            });
        }
    });
}

export const useDeleteDiary = () => {
    const queryClient = useQueryClient();

    return useMutationWithErrorHandling((diaryId: number) => {
        return deleteDiary(diaryId);
    }, {
        onSuccess: (_, diaryId) => {
            queryClient.removeQueries(["diary", diaryId], { exact: true });
            queryClient.invalidateQueries("diaries");
        }
    });
}