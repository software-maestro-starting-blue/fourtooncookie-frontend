import { ReactNode, useContext, useEffect, useState } from "react";
import type { Character } from "../../../types/character";
import GlobalErrorInfoStateContext from "../GlobalError/GlobalErrorInfoStateContext";
import { getCharacters } from "../../../apis/character";
import { GlobalErrorInfoType } from "../../../types/error";
import GlobalCharacterListStateContext from "./GlobalCharacterListStateContext";
import { jwtManager } from "../../../apis/jwt";


export interface GlobalCharacterListStateProviderProps {
    children: ReactNode,
}

const GlobalCharacterListStateProvider = (props: GlobalCharacterListStateProviderProps) => {
    const { children } = props;
    const [ characterList, setCharacterList ] = useState<Character[]>([]);

    const { errorInfo, setErrorInfo } = useContext(GlobalErrorInfoStateContext);

    const loadCharacterList = async () => {
        try {
            if (! jwtManager.getToken()) return;

            const responsedCharacterList = await getCharacters();
            if (! responsedCharacterList){
                throw Error('캐릭터를 불러오는 중 오류가 발생했습니다. 잠시후 다시 시도해 주세요.');
            }
            setCharacterList(responsedCharacterList);
        } catch (e) {
            if (e instanceof Error) {
                setErrorInfo({
                    type: GlobalErrorInfoType.MODAL,
                    error: e,
                });
            }
        }
    };

    useEffect(() => {
        loadCharacterList();
    }, []);

    const updateCharacterList = () => {
        loadCharacterList();
    }

    return (
        <GlobalCharacterListStateContext.Provider value={{ characterList, updateCharacterList }}>
            {children}
        </GlobalCharacterListStateContext.Provider>
    );
}

export default GlobalCharacterListStateProvider;