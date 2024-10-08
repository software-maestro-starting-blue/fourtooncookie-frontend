import { useQuery } from "react-query"
import { getCharacters } from "../../apis/character"
import { Character } from "../../types/character";


export const useCharacters = () => {
    return useQuery<Character[], Error>("characters", getCharacters);
}

export const useCharacterById = (characterId: number) => {
    return useQuery(["character", characterId], async () => {
        const { data: characters } = useCharacters();

        return characters?.find(character => character.id === characterId);
    });
}