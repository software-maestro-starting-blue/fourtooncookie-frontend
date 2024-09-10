import { create } from "zustand";
import { getCharacters } from "../apis/character";
import { jwtManager } from "../auth/jwt";
import { Character } from "../types/character";

const loadCharacterList = async () : Promise<Character[] | null> => {
    try {
        if (! jwtManager.getToken()) return null;

        const responsedCharacterList = await getCharacters();
        if (! responsedCharacterList){
            throw Error('캐릭터를 불러오는 중 오류가 발생했습니다. 잠시후 다시 시도해 주세요.');
        }

        return responsedCharacterList;
        
    } catch (e) {
        return null;
    }
};

const updateCharacterList = async (set: setType) => {
    set(await loadCharacterList());
}


export const useCharacterListStore = create((set: setType) => ({
    characterList: loadCharacterList(),
    updateCharacterList: updateCharacterList(set)
}));