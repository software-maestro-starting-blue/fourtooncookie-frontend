import { ReactNode, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { JWTToken } from "../../../types/jwt";
import GlobalJwtTokenStateContext from "./GlobalJwtTokenStateContext";


export interface GlobalJwtTokenStateProviderProps {
    children: ReactNode,
}

const GlobalJwtTokenStateProvider = (props: GlobalJwtTokenStateProviderProps) => {
    const { children } = props;
    const [ jwtToken, setJwtTokenState ] = useState<JWTToken | null>(null);

    useEffect(() => {
        const loadJwtToken = async () => {
            try {
                const savedJwtToken = await AsyncStorage.getItem('jwtToken');
                if (savedJwtToken) {
                    setJwtTokenState(JSON.parse(savedJwtToken));
                }
            } catch (e) {
                console.error('Failed to load the jwt token from storage:', e);
            }
        };

        loadJwtToken();
    }, []);
    
    const setJwtToken = async (jwtToken: JWTToken | null) => {
        try {
            if (jwtToken) {
                await AsyncStorage.setItem('jwtToken', JSON.stringify(jwtToken));
            } else {
                await AsyncStorage.removeItem('jwtToken');
            }
            setJwtTokenState(jwtToken);
        } catch (e) {
            throw new Error('Failed to save the jwtToken to storage: ' + e)
        }
    };

    return (
        <GlobalJwtTokenStateContext.Provider value={{ jwtToken, setJwtToken }}>
            {children}
        </GlobalJwtTokenStateContext.Provider>
    );
}