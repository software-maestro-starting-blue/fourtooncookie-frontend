import { useEffect, useRef, useState } from "react";
import { Gender } from "../../types/gender";
import ProgressBar from "../../components/common/ProgressBar/ProgressBar";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import * as S from "./SignUpPage.styled";
import Header from "./Header/Header";
import Button from "../../components/common/Button/Button";
import NameInputLayout from "./NameInputLayout/NameInputLayout";
import BirthInputLayout from "./BirthInputLayout/BirthInputLayout";
import GenderInputLayout from "./GenderInputLayout/GenderInputLayout";


enum SignUpProgres {
    NAME = 1,
    BIRTH = 2,
    GENDER = 3
}

const SignUpPage = () => {
    const [ name, setName ] = useState<string>('');
    const [ birth, setBirth ] = useState<Date>(new Date());
    const [ gender, setGender ] = useState<Gender | null>(null);

    const [ signUpProgress, setSignUpProgress ] = useState<SignUpProgres>(SignUpProgres.NAME);

    const isNextButtonAvailabe: boolean = 
        (signUpProgress == SignUpProgres.NAME && name.length > 0)
        || (signUpProgress == SignUpProgres.BIRTH && birth != null)
        || (signUpProgress == SignUpProgres.GENDER && gender != null);

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
        if (! isNextButtonAvailabe) return;

        if (signUpProgress < SignUpProgres.GENDER){
            setSignUpProgress(signUpProgress + 1);
        } else {
            // TODO 회원가입 요청
            // TODO 페이지 이동
        }
    }

    return (
        <KeyboardAvoidingView style={S.styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={S.styles.contentContainer}>
                <Header />
                {signUpProgress == SignUpProgres.NAME && <NameInputLayout name={name} onNameChange={handleNameChange} />}
                {signUpProgress == SignUpProgres.BIRTH && <BirthInputLayout birth={birth} onBirthChange={handleBirthChange} />}
                {signUpProgress == SignUpProgres.GENDER && <GenderInputLayout gender={gender} onGenderChange={handleGenderChange} />}
            </View>
            <View style={S.styles.footer}>
                <ProgressBar
                    progress={signUpProgress}
                    totalProgress={3}
                    isAnimated={true}
                />
                <Button
                    title="다음"
                    onPress={handleNextButtonClick}
                    style={{...S.styles.nextButton, backgroundColor: isNextButtonAvailabe ? '#FFC426' : '#DDDDDD'}}
                    textStyle={S.styles.nextButtonText}
                />
            </View>
        </KeyboardAvoidingView>
    );
}

export default SignUpPage;