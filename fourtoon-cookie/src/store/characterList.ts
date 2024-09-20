import { create } from "zustand";
import { getCharacters } from "../apis/character";
import { Character } from "../types/character";


interface CharacterListState {
    characterList: Character[];
    updateCharacterList: () => Promise<void>;
}

export const useCharacterListStore = create<CharacterListState>(
    (set) => ({
        characterList: [],

        updateCharacterList: async () => {
            try {
                const characterList = await getCharacters();

                set({ characterList });
            } catch (e) {
                throw e;
            }
        }
}));