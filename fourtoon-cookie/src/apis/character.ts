import { API_URL } from "@env";
import type { Character } from "../types/character";
import type { CharacterSavedResponse } from "../types/dto/character";
import { requestApi } from "./api";
import { GlobalJwtTokenStateContextProps } from "../components/global/GlobalJwtToken/GlobalJwtTokenStateContext";

export const getCharacters = async (jwtContext: GlobalJwtTokenStateContextProps): Promise<Character[]> => {
    const response = await requestApi(`/character`, 'GET', jwtContext, undefined);
    const data = await response.json();
    const characterResponses: CharacterSavedResponse[] = data.characterResponses;
    return [...characterResponses];
};
