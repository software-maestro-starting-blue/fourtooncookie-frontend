import type { Diary } from "../types/diary";
import type { DiaryCreatedResponse, DiaryPatchFavoriteRequest, DiarySaveRequest, DiarySavedResponse, DiaryUpdateRequest } from "../types/dto/diary";
import { requestApi } from "./api";
import { LocalDate } from "@js-joda/core";
import { ApiError } from "../types/error/ApiError";
import { API_METHOD_TYPE, API_STATUS } from "../constants/api";

export const getDiary = async (diaryId: number): Promise<Diary> => {
    const response = await requestApi(`/diary/${diaryId}`, API_METHOD_TYPE.GET);

    if (response.status !== API_STATUS.SUCCESS) {
        throw new ApiError("일기를 불러오는 중 오류가 발생했습니다.", response.status);
    }

    const diaryResponse: DiarySavedResponse = await response.json();
    return { ...diaryResponse, diaryDate: LocalDate.parse(diaryResponse.diaryDate) };
}

export const getDiaries = async (pageNumber: number): Promise<Diary[]> => {
    const response = await requestApi(`/diary/timeline?pageNumber=${pageNumber}`, API_METHOD_TYPE.GET);

    if (response.status === API_STATUS.SUCCESS) {
        const responseData = await response.json();

        if (!Array.isArray(responseData.diarySavedResponses)) {
            throw new ApiError("잘못된 응답 형식입니다. 일기 목록을 불러오지 못했습니다.");
        }

        const diaryResponses = responseData.diarySavedResponses as DiarySavedResponse[];

        return diaryResponses.map(diary => ({...diary, diaryDate: LocalDate.parse(diary.diaryDate)}));
    } else if (response.status === API_STATUS.NO_CONTENT) {
        return [];
    } else {
        throw new ApiError("일기 목록을 불러오는 중 오류가 발생했습니다.", response.status);
    }
}

export const postDiary = async (characterId: number, date: LocalDate, content: string) : Promise<number> => {

    const requestBody: DiarySaveRequest = {
        characterId: characterId,
        content: content,
        diaryDate: date,
    };

    const response = await requestApi(`/diary`, API_METHOD_TYPE.POST, requestBody);

    if (! (response.status == API_STATUS.SUCCESS || response.status == API_STATUS.CREATED)) {
        throw new ApiError("일기를 저장하는 중 오류가 발생했습니다. 다시 시도해 주세요.", response.status);
    }

    const responseData: DiaryCreatedResponse = await response.json();

    return responseData.diaryId;
}

export const putDiary = async (characterId: number, diaryId: number, content: string) => {
    
    const requestBody: DiaryUpdateRequest = {
        content: content,
        characterId: characterId
    }; 
    const response = await requestApi(`/diary/${diaryId}`, API_METHOD_TYPE.PUT, requestBody);
    
    if (response.status != API_STATUS.SUCCESS) {
        throw new ApiError("일기를 수정하는 중 오류가 발생했습니다. 다시 시도해 주세요.", response.status);
    }
}

export const deleteDiary = async (diaryId: number): Promise<void> => {
    const response = await requestApi(`/diary/${diaryId}`, API_METHOD_TYPE.DELETE);

    if (response.status != API_STATUS.NO_CONTENT) {
        throw new ApiError("일기를 삭제하는 중 오류가 발생했습니다. 다시 시도해 주세요.", response.status);
    }
};

export const patchDiaryFavorite = async (diaryId: number, isFavorite: boolean): Promise<void> => {
    const requestBody: DiaryPatchFavoriteRequest = {
        isFavorite: isFavorite
    }

    const response = await requestApi(`/diary/${diaryId}/favorite`, API_METHOD_TYPE.PATCH, requestBody);

    if (response.status != API_STATUS.SUCCESS) {
        throw new ApiError("일기 즐겨찾기 중 오류가 발생했습니다. 다시 시도해 주세요.", response.status);
    }
};