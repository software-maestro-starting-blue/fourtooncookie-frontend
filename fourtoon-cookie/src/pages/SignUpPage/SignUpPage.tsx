import { useEffect, useRef } from "react";
import * as S from "./SignUpPage.styled";
import { Gender } from "../../types/gender";

enum SignUpProgres {
    NAME = 0,
    BIRTH = 1,
    GENDER = 2
}

const SignUpPage = () => {
    const nameRef = useRef<string>('');
    const birthRef = useRef<Date>(new Date());
    const genderRef = useRef<Gender>(Gender.MALE);

    const signUpProgressRef = useRef<SignUpProgres>(SignUpProgres.NAME);

    useEffect(() => {
        // TODO progress bar 애니메이션 구축
    }, [signUpProgressRef]);

    const handleNextButtonClick = () => {
        if (signUpProgressRef.current < SignUpProgres.GENDER){
            signUpProgressRef.current++;
        } else {
            // TODO 회원가입 요청
            // TODO 페이지 이동
        }
    }

    return ();
}

export default SignUpPage;