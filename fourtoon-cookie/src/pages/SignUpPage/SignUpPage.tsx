import { useEffect, useRef, useState } from "react";
import * as S from "./SignUpPage.styled";
import { Gender } from "../../types/gender";

enum SignUpProgres {
    NAME = 0,
    BIRTH = 1,
    GENDER = 2
}

const SignUpPage = () => {
    const [ name, setName ] = useState<string>('');
    const [ birth, setBirth ] = useState<Date>(new Date());
    const [ gender, setGender ] = useState<Gender | null>(null);

    const [ signUpProgress, setSignUpProgress ] = useState<SignUpProgres>(SignUpProgres.NAME);

    useEffect(() => {
        // TODO progress bar 애니메이션 구축
    }, [signUpProgress]);

    const handleNameChange = (name: string) => {
        if (signUpProgress != SignUpProgres.NAME) return;

        setName(name);
    }

    const handleBirthChange = (birth: Date) => {
        if (signUpProgress != SignUpProgres.BIRTH) return;

        setBirth(birth);
    }

    const handleGenderChange = (gender: Gender) => {
        if (signUpProgress != SignUpProgres.GENDER) return;

        setGender(gender);
    }

    const handleNextButtonClick = () => {
        if (signUpProgress < SignUpProgres.GENDER){
            setSignUpProgress(signUpProgress + 1);
        } else {
            // TODO 회원가입 요청
            // TODO 페이지 이동
        }
    }

    return ();
}

export default SignUpPage;