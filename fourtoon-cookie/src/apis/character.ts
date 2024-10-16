import { API_METHOD_TYPE, API_STATUS } from "../types/api";
import { ApiError } from "../types/error/ApiError";
import type { Character } from "../types/character";
import { requestApi } from "./api";
import i18n from "../system/i18n";

export const getCharacters = async (): Promise<Character[]> => {
    const response = await requestApi(`/character`, API_METHOD_TYPE.GET);
    if (response.status !== API_STATUS.SUCCESS) {
        throw new ApiError(i18n.t("error.api.character"), response.status);
    }

    const responseData = await response.json();

    if (!Array.isArray(responseData.characterSavedResponses)) {
        throw new ApiError(i18n.t("error.api.character"), response.status);
    }

    return responseData.characterSavedResponses as Character[];
};
