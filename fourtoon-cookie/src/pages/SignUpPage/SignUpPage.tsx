import { ReactNode, useEffect, useState } from "react";
import { Gender } from "../../types/gender";
import ProgressBar from "../../components/common/ProgressBar/ProgressBar";
import { Keyboard, KeyboardAvoidingView, SafeAreaView, Text, View } from "react-native";
import * as S from "./SignUpPage.styled";
import Header from "./Header/Header";
import Button from "../../components/common/Button/Button";
import NameInputLayout from "./NameInputLayout/NameInputLayout";
import BirthInputLayout from "./BirthInputLayout/BirthInputLayout";
import GenderInputLayout from "./GenderInputLayout/GenderInputLayout";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/routing";
import { LocalDate } from "@js-joda/core";
import { GlobalErrorInfoType } from "../../types/error";
import handleError from "../../error/errorhandler";

import AgreementInputLayout from "./AgreementInputLayout/AgreementInputLayout";
import { useAccountState } from "../../hooks/account";

enum SignUpProgres {
    NAME = 1,
    BIRTH = 2,
    GENDER = 3,
    AGREEMENT = 4
}

const SignUpPage = () => {
    const [name, setName] = useState<string>('');
    const [birth, setBirth] = useState<LocalDate>(LocalDate.now());
    const [gender, setGender] = useState<Gender | null>(null);
    const [isAgreed, setIsAgreed] = useState<boolean>(false);

    const [signUpProgress, setSignUpProgress] = useState<SignUpProgres>(SignUpProgres.NAME);

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const { logout, signup } = useAccountState();

    const isNextButtonAvailabe: boolean = 
        (signUpProgress == SignUpProgres.NAME && name.length > 0)
        || (signUpProgress == SignUpProgres.BIRTH && birth != null && ! birth.isAfter(LocalDate.now()))
        || (signUpProgress == SignUpProgres.GENDER && gender != null)
        || (signUpProgress == SignUpProgres.AGREEMENT && isAgreed);

    const handleNameChange = (name: string) => {
        if (signUpProgress != SignUpProgres.NAME) return;
        setName(name);
    };

    const handleBirthChange = (birth: LocalDate) => {
        if (signUpProgress != SignUpProgres.BIRTH) return;
        setBirth(birth);
    };

    const handleGenderChange = (gender: Gender) => {
        if (signUpProgress != SignUpProgres.GENDER) return;
        setGender(gender);
    };

    const handleAgreementChange = (isAgreed: boolean) => {
        setIsAgreed(isAgreed);
    };

    const handleBackButtonPress = () => {
        if (signUpProgress == SignUpProgres.NAME) {
            logout();
            return;
        }

        setSignUpProgress(signUpProgress - 1);
    }

    const handleNextButtonClick = () => {
        if (!isNextButtonAvailabe) return;

        if (signUpProgress < SignUpProgres.AGREEMENT) {
            setSignUpProgress(signUpProgress + 1);
        } else {
            if (!gender || !isAgreed) return;

            try {
                signup({
                    name,
                    birth,
                    gender,
                });
                navigation.navigate('DiaryTimelinePage');
            } catch (error) {
                if (error instanceof Error) {
                    handleError(
                        error,
                        GlobalErrorInfoType.ALERT
                    );
                }
            }
        }
    };

    return (
        <SafeAreaView style={S.styles.safeArea}>
            <View style={S.styles.container}>
                <Header onBackButtonPress={handleBackButtonPress}/>
                {
                    signUpProgress == SignUpProgres.NAME && 
                    <Container title="당신의 닉네임을 알려주세요">
                        <NameInputLayout 
                            name={name} 
                            onNameChange={handleNameChange} 
                        />
                    </Container>
                }
                {
                    signUpProgress == SignUpProgres.BIRTH && 
                    <Container title="생년월일을 알려주세요">
                        <BirthInputLayout 
                            birth={birth} 
                            onBirthChange={handleBirthChange} 
                        />
                    </Container>
                }
                {
                    signUpProgress == SignUpProgres.GENDER && 
                    <Container title="당신의 성별을 알려주세요">
                        <GenderInputLayout 
                            gender={gender} 
                            onGenderChange={handleGenderChange} 
                        />
                    </Container>
                }
                {
                    signUpProgress == SignUpProgres.AGREEMENT && 
                    <Container title="서비스 약관 및 정책">
                        <AgreementInputLayout 
                            onAgreementChange={handleAgreementChange} 
                        />
                    </Container>
                }
                <KeyboardAvoidingView 
                    style={S.styles.bottomContainer} 
                    enabled={true}
                    keyboardVerticalOffset={80}
                    behavior={'padding'}
                >
                    <View style={S.styles.progressContainer}>
                        <ProgressBar
                            progress={signUpProgress}
                            totalProgress={4}
                            isAnimated={true}
                        />
                    </View>
                    <Button
                        title="다음"
                        onPress={handleNextButtonClick}
                        style={{
                            ...S.styles.nextButton, 
                            backgroundColor: isNextButtonAvailabe ? '#FFC426' : '#DDDDDD'
                        }}
                        textStyle={S.styles.nextButtonText}
                    />
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    );
};

export default SignUpPage;


interface ContainerProps {
    title: string;
    children: ReactNode;
}

const Container = (props: ContainerProps) => {
    const { title, children, ...rest } = props;

    return (
        <View>
            <Text style={S.styles.title}>{title}</Text>
            <View style={S.styles.inputContainer}>
                {children}
            </View>
        </View>
    );
}