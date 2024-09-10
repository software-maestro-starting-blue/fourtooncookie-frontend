import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
import { Character } from "../types/character";
import AsyncStorage from "@react-native-async-storage/async-storage";


const setSelectedCharacter = (selectedCharacter: Character, set: setType) => {
    set(selectedCharacter);
}


export const useSelectedCharacterStore = create( 
    persist( 
        (set: setType) => ({
            selectedCharacter: null,
            setSelectedCharacter: (selectedCharacter: Character) => setSelectedCharacter(selectedCharacter, set),
        }), 
        {
            name: 'selected-character-storage',
            getStorage: () => AsyncStorage,
        }
    )
);