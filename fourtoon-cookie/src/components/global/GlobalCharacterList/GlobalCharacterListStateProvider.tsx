import { ReactNode, useEffect, useState } from "react";
import type { Character } from "../../../types/character";
import { getCharacters } from "../../../apis/character";
import { GlobalErrorInfoType } from "../../../types/error";
import GlobalCharacterListStateContext from "./GlobalCharacterListStateContext";
import { jwtManager } from "../../../auth/jwt";
import handleError from "../../../error/errorhandler";


export interface GlobalCharacterListStateProviderProps {
    children: ReactNode,
}

const GlobalCharacterListStateProvider = (props: GlobalCharacterListStateProviderProps) => {
    const { children } = props;
    const [ characterList, setCharacterList ] = useState<Character[]>([]);

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
                handleError(
                    e,
                    GlobalErrorInfoType.ALERT
                );
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