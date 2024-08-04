import { API_URL } from "@env";
import type { Diary } from "../types/diary";
import type { DiarySaveRequest, DiarySavedResponse, DiaryUpdateRequest } from "../types/dto/diary";
import { GlobalJwtTokenStateContextProps } from "../components/global/GlobalJwtToken/GlobalJwtTokenStateContext";
import { requestApi } from "./api";
import { LocalDate } from "@js-joda/core";
import { ApiError } from "../error/ApiError";

export const getDiary = async (diaryId: number, jwtContext: GlobalJwtTokenStateContextProps): Promise<Diary> => {
    const response = await requestApi(`/diary/${diaryId}`, 'GET', jwtContext, undefined);
    const diaryResponse: DiarySavedResponse = await response.json();
    return { ...diaryResponse };
}

export const getDiaries = async (pageNumber: number, jwtContext: GlobalJwtTokenStateContextProps): Promise<Diary[]> => {
    const response = await requestApi(`/diary/timeline?pageNumber=${pageNumber}`, 'GET', jwtContext, undefined);

    if (response.status === 200) {
        const data: DiarySavedResponse[] = await response.json();
        return data.map(diary => ({...diary}));
    } else if (response.status === 204) {
        return [];
    } else {
        throw new ApiError("[GET] getDiaries error");
    }
}

export const postDiary = async (characterId: number, date: LocalDate, content: string, hashtagIds: number[], jwtContext: GlobalJwtTokenStateContextProps) => {

    const requestBody: DiarySaveRequest = {
        characterId: characterId,
        content: content,
        hashtagIds: hashtagIds,
        diaryDate: date,
    };

    const response = await requestApi(`/diary`, 'POST', jwtContext, requestBody);
    if (response.status === 200) {
        return;
    } else {
        throw new ApiError("[POST] postDiary error");
    }
}

export const patchDiary = async (characterId: number, diaryId: number, content: string, hashtagIds: number[], jwtContext: GlobalJwtTokenStateContextProps) => {
    
    const requestBody: DiaryUpdateRequest = {
        content: content,
        hashtagIds: hashtagIds,
        characterId: characterId
    }; 
    const response = await requestApi(`/diary/${diaryId}`, 'PATCH', jwtContext, requestBody);
    
    if (response.status === 200) {
        return;
    } else {
        throw new ApiError("[PATCH] patchDiary error");
    }
}

export const deleteDiary = async (diaryId: number, jwtContext: GlobalJwtTokenStateContextProps): Promise<void> => {
    const response = await requestApi(`/diary/${diaryId}`, 'DELETE', jwtContext, undefined);

    if (response.status === 204) {
        return;
    } else {
        throw new ApiError("[DELETE] deleteDiary error ");
    }
};

export const patchDiaryFavorite = async (diaryId: number, isFavorite: boolean, jwtContext: GlobalJwtTokenStateContextProps): Promise<void> => {
    const response = await requestApi(`/diary/favorite/${diaryId}`, 'PATCH', jwtContext, isFavorite);

    if (response.status === 200) {
        return;
    } else {
        throw new ApiError("[PATCH] patchDiaryFavorite error ");
    }
};