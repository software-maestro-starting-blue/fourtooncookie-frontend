import { createContext } from "react";
import type { Character } from "../../../types/character";


export interface GlobalCharacterListStateContextProps {
    characterList: Character[];
    updateCharacterList: () => void;
}

export const defaultValueOfGlobalCharacterListStateContextProps: GlobalCharacterListStateContextProps = {
    characterList: [],
    updateCharacterList: () => { },
};

const GlobalCharacterListStateContext = createContext<GlobalCharacterListStateContextProps>(defaultValueOfGlobalCharacterListStateContextProps);

export default GlobalCharacterListStateContext;