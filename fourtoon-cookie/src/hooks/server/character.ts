import { getCharacters } from "../../apis/character"
import { Character } from "../../types/character";
import { useQueryWithErrorHandling } from "../error";


export const useCharacters = () => {
    return useQueryWithErrorHandling<Character[], Error>("characters", getCharacters);
}

export const useCharacterById = (characterId: number) => {
    return useQueryWithErrorHandling(["character", characterId], async () => {
        const { data: characters } = useCharacters();

        return characters?.find(character => character.id === characterId);
    });
}