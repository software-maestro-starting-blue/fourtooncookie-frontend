import type { Diary } from "../types/diary";
import type { DiaryPatchFavoriteRequest, DiarySaveRequest, DiarySavedResponse, DiaryUpdateRequest } from "../types/dto/diary";
import { requestApi } from "./api";
import { LocalDate } from "@js-joda/core";
import { ApiError } from "../error/ApiError";

export const getDiary = async (diaryId: number): Promise<Diary> => {
    const response = await requestApi(`/diary/${diaryId}`, 'GET', undefined);
    const diaryResponse: DiarySavedResponse = await response.json();
    return { ...diaryResponse, diaryDate: LocalDate.parse(diaryResponse.diaryDate) };
}

export const getDiaries = async (pageNumber: number): Promise<Diary[]> => {
    const response = await requestApi(`/diary/timeline?pageNumber=${pageNumber}`, 'GET', undefined);

    if (response.status === 200) {
        const data: DiarySavedResponse[] = await response.json();
        return data.map(diary => ({...diary, diaryDate: LocalDate.parse(diary.diaryDate)}));
    } else if (response.status === 204) {
        return [];
    } else {
        throw new ApiError("일기 목록을 불러오는 중 오류가 발생했습니다.");
    }
}

export const postDiary = async (characterId: number, date: LocalDate, content: string, hashtagIds: number[]) => {

    const requestBody: DiarySaveRequest = {
        characterId: characterId,
        content: content,
        hashtagIds: hashtagIds,
        diaryDate: date,
    };

    const response = await requestApi(`/diary`, 'POST', requestBody);
    if (response.status === 200) {
        return;
    } else {
        throw new ApiError("일기를 저장하는 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
}

export const patchDiary = async (characterId: number, diaryId: number, content: string, hashtagIds: number[]) => {
    
    const requestBody: DiaryUpdateRequest = {
        content: content,
        hashtagIds: hashtagIds,
        characterId: characterId
    }; 
    const response = await requestApi(`/diary/${diaryId}`, 'PATCH', requestBody);
    
    if (response.status === 200) {
        return;
    } else {
        throw new ApiError("일기를 수정하는 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
}

export const deleteDiary = async (diaryId: number): Promise<void> => {
    const response = await requestApi(`/diary/${diaryId}`, 'DELETE', undefined);

    if (response.status === 204) {
        return;
    } else {
        throw new ApiError("일기를 삭제하는 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
};

export const patchDiaryFavorite = async (diaryId: number, isFavorite: boolean): Promise<void> => {
    const requestBody: DiaryPatchFavoriteRequest = {
        isFavorite: isFavorite
    }

    const response = await requestApi(`/diary/${diaryId}/favorite`, 'PATCH', requestBody);

    if (response.status === 200) {
        return;
    } else {
        throw new ApiError("일기 즐겨찾기 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
};