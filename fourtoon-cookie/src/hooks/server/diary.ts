import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "react-query"
import { deleteDiary, getDiaries, getDiary, getDiaryImage, patchDiaryFavorite, postDiary, putDiary } from "../../apis/diary"
import { Diary } from "../../types/diary";
import { useAccountState } from "../account";
import { AccountStatus } from "../../types/account";
import { useEffect } from "react";
import { JwtError } from "../../error/JwtError";


export const useDiaries = () => {
    const queryClient = useQueryClient();
    const { accountState } = useAccountState();

    useEffect(() => {
        if (accountState == AccountStatus.LOGINED) return;

        queryClient.invalidateQueries("diaries");
    }, [accountState, queryClient]);


    return useInfiniteQuery("diaries", 
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

    useEffect(() => {
        if (accountState == AccountStatus.LOGINED) return;

        queryClient.invalidateQueries(["diary", diaryId], { exact: true });
    }, [accountState, diaryId, queryClient]);

    return useQuery(["diary", diaryId], () => {
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

    return useMutation((diary: Diary) => {
        return postDiary(diary.characterId, diary.diaryDate, diary.content);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries("diaries");
        }
    });
}

export const useUpdateDiary = () => {
    const queryClient = useQueryClient();

    return useMutation((diary: Diary) => {
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

    return useMutation((isFavorite: boolean) => {
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

    return useMutation((diaryId: number) => {
        return deleteDiary(diaryId);
    }, {
        onSuccess: (_, diaryId) => {
            queryClient.removeQueries(["diary", diaryId], { exact: true });
            queryClient.invalidateQueries("diaries");
        }
    });
}

export const useDownloadDiaryImage = (diaryId: number | undefined) => {
    const queryClient = useQueryClient();
    const { accountState } = useAccountState();

    return useQuery(
        ["diary", diaryId, "download"],
        () => {
            if (!diaryId) throw new Error("Diary ID is undefined");
            return getDiaryImage(diaryId);
        },
        {
            enabled: accountState === AccountStatus.LOGINED && !!diaryId,
            retry: false,
            onError: (error: Error) => {
                if (error instanceof JwtError) {
                    queryClient.cancelQueries(["diary", diaryId, "download"], { exact: true });
                    queryClient.removeQueries(["diary", diaryId, "download"], { exact: true });
                } else {
                    console.error("Error downloading diary image:", error);
                }
            },
            initialData: () => queryClient.getQueryData(["diary", diaryId, "download"]),
        }
    );
};