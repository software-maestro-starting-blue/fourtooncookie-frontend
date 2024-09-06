import { API_STATUS } from "../constants/api";
import { ApiError } from "../error/ApiError";
import type { Character } from "../types/character";
import type { CharacterSavedResponse } from "../types/dto/character";
import { requestApi } from "./api";

export const getCharacters = async (): Promise<Character[]> => {
    const response = await requestApi(`/character`, 'GET');

    if (response.status !== API_STATUS.SUCCESS) {
        throw new ApiError('캐릭터를 불러오는 중 오류가 발생했습니다. 잠시후 다시 시도해 주세요.', response.status);
    }

    const characterResponses: CharacterSavedResponse[] = await response.json();
    return [...characterResponses];
};
