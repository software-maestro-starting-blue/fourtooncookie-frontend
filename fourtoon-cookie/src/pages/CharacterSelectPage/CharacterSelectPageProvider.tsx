import { LocalDate } from "@js-joda/core";
import { createContext, useContext, useState } from "react";
import { CharacterPaymentType } from "../../types/character";

export interface CharacterSelectPageContextType {
    selectedPaymentType: CharacterPaymentType;
    setSelectedPaymentType: (paymentType: CharacterPaymentType) => void;
}

const defaultCharacterSelectPageContextType: CharacterSelectPageContextType = {
    selectedPaymentType: CharacterPaymentType.FREE,
    setSelectedPaymentType: () => {},
}

const CharacterSelectPageContext = createContext<CharacterSelectPageContextType>(defaultCharacterSelectPageContextType);

export interface CharacterSelectPageProviderProps {
    children: React.ReactNode;
}

const CharacterSelectPageProvider = (props: CharacterSelectPageProviderProps) => {
    const { children } = props;

    const [ selectedPaymentType, setSelectedPaymentType ] = useState<CharacterPaymentType>(CharacterPaymentType.FREE);

    return (
        <CharacterSelectPageContext.Provider value={{selectedPaymentType, setSelectedPaymentType}}>
            {children}
        </CharacterSelectPageContext.Provider>
    );
}

export default CharacterSelectPageProvider;

export const useCharacterSelectPageContext = () => {
    return useContext(CharacterSelectPageContext);
}