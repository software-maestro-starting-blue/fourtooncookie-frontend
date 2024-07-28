import { API_URL } from "@env";
import type { Character } from "../types/character";
import type { CharacterSavedResponse } from "../types/dto/character";

export const getCharacters = async (): Promise<Character[]> => {
    try {
        const response = await fetch(`${API_URL}/character`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` // TODO: accessToken 관리에 대한 논의가 필요
            }
        });
        
        if (response.status === 200) {
            const data = await response.json();
            const characterResponses: CharacterSavedResponse[] = data.characterResponses;
            return [...characterResponses];
            
        } else if (response.status === 204) {
            return [];
        } else {
            throw new Error("[GET] getCharacters error");
        }
    } catch (error) {
        console.error("getCharacters : ", error);
        throw new Error("getCharacters error");
    }
};
