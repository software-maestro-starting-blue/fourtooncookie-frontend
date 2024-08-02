import { createContext } from 'react';
import { JWTToken } from '../../../types/jwt';

export interface GlobalJwtTokenStateContextProps {
	jwtToken: JWTToken | null;
	setJwtToken: (JWTToken: JWTToken | null) => void;
}

export const defaultValueOfGlobalJwtTokenStateContextProps: GlobalJwtTokenStateContextProps = {
	jwtToken: null,
	setJwtToken: () => { },
};

const GlobalJwtTokenStateContext = createContext<GlobalJwtTokenStateContextProps>(defaultValueOfGlobalJwtTokenStateContextProps);

export default GlobalJwtTokenStateContext;
