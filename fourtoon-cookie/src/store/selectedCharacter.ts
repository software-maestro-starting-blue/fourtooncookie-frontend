import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
import { Character } from "../types/character";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SelectedCharacterState {
    selectedCharacter: Character | null;
    setSelectedCharacter: (selectedCharacter: Character) => void;
}

export const useSelectedCharacterStore = create( 
    persist<SelectedCharacterState>(
        (set) => ({
            selectedCharacter: null,

            setSelectedCharacter: (selectedCharacter: Character) => {
                set({ selectedCharacter });
            },
        }), 
        {
            name: 'selected-character-storage',
            getStorage: () => AsyncStorage,
        }
    )
);