import { API_URL } from "@env";
import type { Diary } from "../types/diary";
import type { DiarySaveRequest, DiarySavedResponse, DiaryUpdateRequest } from "../types/dto/diary";
import { GlobalJwtTokenStateContextProps } from "../components/global/GlobalJwtToken/GlobalJwtTokenStateContext";
import { requestApi } from "./api";
import { LocalDate } from "@js-joda/core";

export const getDiary = async (diaryId: number, jwtContext: GlobalJwtTokenStateContextProps): Promise<Diary> => {
    try {
        const response = await requestApi(`/diary/${diaryId}`, 'GET', jwtContext, undefined);
        const diaryResponse: DiarySavedResponse = await response.json();
        return { ...diaryResponse };
    } catch (error) {
        console.error("getDiary : ", error);
        throw new Error("getDiary error");
    }
}

export const getDiaries = async (pageNumber: number, jwtContext: GlobalJwtTokenStateContextProps): Promise<Diary[]> => {
    try {
        const response = await requestApi(`/diary/timeline?pageNumber=${pageNumber}`, 'GET', jwtContext, undefined);

        if (response.status === 200) {
            const data: DiarySavedResponse[] = await response.json();
            return data.map(diary => ({...diary}));
        } else if (response.status === 204) {
            return [];
        } else {
            throw new Error("[GET] getDiaries error");
        }

    } catch (error) {
        throw new Error("[GET] getDiaries " + error);
    }
}

export const postDiary = async (characterId: number, date: LocalDate, content: string, hashtagIds: number[], jwtContext: GlobalJwtTokenStateContextProps) => {

    const requestBody: DiarySaveRequest = {
        characterId: characterId,
        content: content,
        hashtagIds: hashtagIds,
        diaryDate: date,
    }; // TODO: 캐릭터 아이디를 가지고 와야함.

    try {
        const response = await requestApi(`/diary`, 'POST', jwtContext, requestBody);
        if (response.status === 200) {
            return;
        } else {
            throw new Error("[POST] postDiary error");
        }
    } catch (error) {
        throw new Error("[POST] postDiary " + error);  
    }
}

export const patchDiary = async (characterId: number, diaryId: number, content: string, hashtagIds: number[], jwtContext: GlobalJwtTokenStateContextProps) => {
    
    const requestBody: DiaryUpdateRequest = {
        content: content,
        hashtagIds: hashtagIds,
        characterId: characterId
    }; 

    try {
        const response = await requestApi(`/diary/${diaryId}`, 'PATCH', jwtContext, requestBody);
        
        if (response.status === 200) {
            return;
        } 
    } catch (error) {
        console.error("patchDiary : ", error);
    }

    throw new Error("patchDiary error");
}

export const deleteDiary = async (diaryId: number, jwtContext: GlobalJwtTokenStateContextProps): Promise<void> => {
    try {
        const response = await requestApi(`/diary/${diaryId}`, 'DELETE', jwtContext, undefined);

        if (response.status === 204) {
            return;
        } else {
            throw new Error("[DELETE] deleteDiary error ");
        }
    } catch (error) {
        throw new Error("[DELETE] deleteDiary error " + error);
    }
};

export const patchDiaryFavorite = async (diaryId: number, isFavorite: boolean, jwtContext: GlobalJwtTokenStateContextProps): Promise<void> => {
    try {
        const response = await requestApi(`/diary/favorite/${diaryId}`, 'PATCH', jwtContext, isFavorite);

        if (response.status === 200) {
            return;
        } else {
            throw new Error("[PATCH] patchDiaryFavorite error ");
        }
    } catch (error) {
        throw new Error("[PATCH] patchDiaryFavorite error " + error);
    }
};