import { createContext } from 'react';
import type { Character } from '../../../types/character';

export interface GlobalSelectionCharacterStateContextProps {
	selectedCharacter: Character | null;
	setSelectedCharacter: (character: Character | null) => void;
}

export const defaultValueOfGlobalSelectionCharacterStateContextProps: GlobalSelectionCharacterStateContextProps = {
	selectedCharacter: null,
	setSelectedCharacter: () => { },
};

const GlobalSelectionCharacterStateContext = createContext<GlobalSelectionCharacterStateContextProps>(defaultValueOfGlobalSelectionCharacterStateContextProps);

export default GlobalSelectionCharacterStateContext;
