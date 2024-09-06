import type { Character } from "../types/character";
import type { CharacterSavedResponse } from "../types/dto/character";
import { requestApi } from "./api";

export const getCharacters = async (): Promise<Character[]> => {
    const response = await requestApi(`/character`, 'GET');
    const characterResponses: CharacterSavedResponse[] = await response.json();
    return [...characterResponses];
};
