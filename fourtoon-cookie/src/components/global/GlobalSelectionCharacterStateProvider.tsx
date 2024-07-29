import React, { useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalSelectionCharacterStateContext from './GlobalSelectionCharacterStateContext';
import type { Character } from '../../types/character';

export interface GlobalSelectionCharacterStateProviderProps {
    children: ReactNode,
}

const GlobalSelectionCharacterStateProvider = (props: GlobalSelectionCharacterStateProviderProps) => {
    const { children } = props;
    const [ selectedCharacter, setSelectedCharacterState ] = useState<Character | null>(null);

    useEffect(() => {
        const loadSelectedCharacter = async () => {
            try {
                const savedCharacter = await AsyncStorage.getItem('selectedCharacter');
                if (savedCharacter) {
                    setSelectedCharacterState(JSON.parse(savedCharacter));
                }
            } catch (e) {
                console.error('Failed to load the selected character from storage:', e);
            }
        };

        loadSelectedCharacter();
    }, []);

    const setSelectedCharacter = async (character: Character | null) => {
        try {
            if (character) {
                await AsyncStorage.setItem('selectedCharacter', JSON.stringify(character));
            } else {
                await AsyncStorage.removeItem('selectedCharacter');
            }
            setSelectedCharacterState(character);
        } catch (e) {
            console.error('Failed to save the selected character to storage:', e);
        }
    };

    return (
        <GlobalSelectionCharacterStateContext.Provider value={{ selectedCharacter, setSelectedCharacter }}>
            {children}
        </GlobalSelectionCharacterStateContext.Provider>
    );
};

export default GlobalSelectionCharacterStateProvider;
