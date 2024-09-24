import { API_METHOD_TYPE, API_STATUS } from "../constants/api";
import { ApiError } from "../types/error/ApiError";
import type { Character } from "../types/character";
import { requestApi } from "./api";

export const getCharacters = async (): Promise<Character[]> => {
    const response = await requestApi(`/character`, API_METHOD_TYPE.GET);
    if (response.status !== API_STATUS.SUCCESS) {
        throw new ApiError('캐릭터를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.', response.status);
    }

    const responseData = await response.json();

    if (!Array.isArray(responseData.characterSavedResponses)) {
        throw new ApiError('잘못된 응답 형식입니다. 캐릭터 목록을 불러오지 못했습니다.');
    }

    return responseData.characterSavedResponses as Character[];
};
