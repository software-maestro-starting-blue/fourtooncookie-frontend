import { ReactNode, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { JWTToken } from "../../../types/jwt";
import GlobalJwtTokenStateContext from "./GlobalJwtTokenStateContext";
import GlobalErrorInfoStateContext from "../GlobalError/GlobalErrorInfoStateContext";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../constants/routing";
import { GlobalErrorInfoType } from "../../../types/error";
import { JwtError } from "../../../error/JwtError";


export interface GlobalJwtTokenStateProviderProps {
    children: ReactNode,
}

const GlobalJwtTokenStateProvider = (props: GlobalJwtTokenStateProviderProps) => {
    const { children } = props;
    const [ jwtToken, setJwtTokenState ] = useState<JWTToken | null>(null);

    const { errorInfo, setErrorInfo } = useContext(GlobalErrorInfoStateContext);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    useEffect(() => {
        const loadJwtToken = async () => {
            try {
                const savedJwtToken = await AsyncStorage.getItem('jwtToken');
                if (savedJwtToken) {
                    setJwtTokenState(JSON.parse(savedJwtToken));
                }
            } catch (error) {
                if (error instanceof Error) {
                    setErrorInfo({
                        type: GlobalErrorInfoType.MODAL,
                        error: new JwtError("인증 정보가 없습니다.")
                    });
                }
            }
        };

        loadJwtToken();
    }, []);

    useEffect(() => {
        if (!errorInfo || ! (errorInfo.error instanceof JwtError)) return;

        navigation.navigate('IntroPage');
        setJwtToken(null);

    }, [errorInfo, navigation]);
    
    const setJwtToken = async (jwtToken: JWTToken | null) => {
        try {
            if (jwtToken) {
                await AsyncStorage.setItem('jwtToken', JSON.stringify(jwtToken));
            } else {
                await AsyncStorage.removeItem('jwtToken');
                setErrorInfo({
                    type: GlobalErrorInfoType.MODAL,
                    error: new JwtError("로그아웃 되었습니다.")
                });
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

export default GlobalJwtTokenStateProvider;