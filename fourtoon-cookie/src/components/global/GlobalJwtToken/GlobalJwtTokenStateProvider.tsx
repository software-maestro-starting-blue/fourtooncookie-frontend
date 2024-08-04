import { ReactNode, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { JWTToken } from "../../../types/jwt";
import GlobalJwtTokenStateContext from "./GlobalJwtTokenStateContext";
import GlobalErrorInfoStateContext from "../GlobalError/GlobalErrorInfoStateContext";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../constants/routing";
import { GlobalErrorInfoType } from "../../../types/error";


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
            } catch (e) {
                setErrorInfo({
                    type: GlobalErrorInfoType.MODAL,
                    message: '로그인 정보를 불러오는데 실패했습니다. 다시 로그인해주세요.',
                    callback: () => {
                        navigation.navigate('IntroPage');
                    }
                });
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
                setErrorInfo({
                    type: GlobalErrorInfoType.MODAL,
                    message: '로그인 정보가 만료되었습니다. 다시 로그인해주세요.',
                    callback: () => {
                        navigation.navigate('IntroPage');
                    }
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