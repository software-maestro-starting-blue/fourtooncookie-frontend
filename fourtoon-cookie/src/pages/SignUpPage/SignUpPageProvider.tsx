import { LocalDate } from "@js-joda/core";
import { createContext, useContext, useState } from "react";
import { Gender } from "../../types/gender";

export enum SignUpProgres {
    NAME = 1,
    BIRTH = 2,
    GENDER = 3,
    AGREEMENT = 4
}

export interface SignUpPageContextType {
    name: string,
    birth: LocalDate,
    gender: Gender | null,
    isAgreed: boolean,
    signUpProgress: SignUpProgres,
    isNextAvailabe: boolean,

    setName: (name: string) => void,
    setBirth: (birth: LocalDate) => void,
    setGender: (gender: Gender) => void,
    setIsAgreed: (isAgreed: boolean) => void,
    setSignUpProgress: (progress: SignUpProgres) => void,
}

const defaultSignUpPageContext: SignUpPageContextType = {
    name: '',
    birth: LocalDate.now(),
    gender: null,
    isAgreed: false,
    signUpProgress: SignUpProgres.NAME,
    isNextAvailabe: false,

    setName: () => {},
    setBirth: () => {},
    setGender: () => {},
    setIsAgreed: () => {},
    setSignUpProgress: () => {},
}

const SignUpPageContext = createContext<SignUpPageContextType>(defaultSignUpPageContext);

export interface SignUpPageProviderProps {
    children: React.ReactNode;
}

const SignUpPageProvider = (props: SignUpPageProviderProps) => {
    const { children } = props;

    const [name, setName] = useState<string>('');
    const [birth, setBirth] = useState<LocalDate>(LocalDate.now());
    const [gender, setGender] = useState<Gender | null>(null);
    const [isAgreed, setIsAgreed] = useState<boolean>(false);

    const [signUpProgress, setSignUpProgress] = useState<SignUpProgres>(SignUpProgres.NAME);

    const isNextAvailabe: boolean = 
        (signUpProgress == SignUpProgres.NAME && name.length > 0)
        || (signUpProgress == SignUpProgres.BIRTH && birth != null && ! birth.isAfter(LocalDate.now()))
        || (signUpProgress == SignUpProgres.GENDER && gender != null)
        || (signUpProgress == SignUpProgres.AGREEMENT && isAgreed);


    return (
        <SignUpPageContext.Provider value={{name, birth, gender, isAgreed, signUpProgress, isNextAvailabe, setName, setBirth, setGender, setIsAgreed, setSignUpProgress}}>
            {children}
        </SignUpPageContext.Provider>
    );
}

export default SignUpPageProvider;

export const useSignUpPageContext = () => {
    return useContext(SignUpPageContext);
}