import { ReactNode, useEffect, useState } from "react";
import { Gender } from "../../types/gender";
import ProgressBar from "../../components/common/ProgressBar/ProgressBar";
import { Keyboard, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Header from "./Header";
import Button from "../../components/common/Button";
import NameInputLayout from "./NameInputLayout";
import BirthInputLayout from "./BirthInputLayout";
import GenderInputLayout from "./GenderInputLayout";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/routing";
import { LocalDate, use } from "@js-joda/core";

import AgreementInputLayout from "./AgreementInputLayout";
import { useAccountState } from "../../hooks/account";
import { useFunctionWithErrorHandling } from "../../hooks/error";
import { useTranslationWithParentName } from "../../hooks/locale";

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

    const { functionWithErrorHandling } = useFunctionWithErrorHandling();

    const t = useTranslationWithParentName('pages.signUpPage');
    const commonT = useTranslationWithParentName('common');

    const isNextButtonAvailabe: boolean = 
        (signUpProgress == SignUpProgres.NAME && name.length > 0)
        || (signUpProgress == SignUpProgres.BIRTH && birth != null && ! birth.isAfter(LocalDate.now()))
        || (signUpProgress == SignUpProgres.GENDER && gender != null)
        || (signUpProgress == SignUpProgres.AGREEMENT && isAgreed);

    const handleNameChange = functionWithErrorHandling((name: string) => {
        if (signUpProgress != SignUpProgres.NAME) return;
        setName(name);
    });

    const handleBirthChange = functionWithErrorHandling((birth: LocalDate) => {
        if (signUpProgress != SignUpProgres.BIRTH) return;
        setBirth(birth);
    });

    const handleGenderChange = functionWithErrorHandling((gender: Gender) => {
        if (signUpProgress != SignUpProgres.GENDER) return;
        setGender(gender);
    });

    const handleAgreementChange = functionWithErrorHandling((isAgreed: boolean) => {
        setIsAgreed(isAgreed);
    });

    const handleBackButtonPress = functionWithErrorHandling(() => {
        if (signUpProgress == SignUpProgres.NAME) {
            logout();
            return;
        }

        setSignUpProgress(signUpProgress - 1);
    })

    const handleNextButtonClick = functionWithErrorHandling(() => {
        if (!isNextButtonAvailabe) return;

        if (signUpProgress < SignUpProgres.AGREEMENT) {
            setSignUpProgress(signUpProgress + 1);
        } else {
            if (!gender || !isAgreed) return;
            
            signup({
                name,
                birth,
                gender,
            });
            navigation.navigate('DiaryTimelinePage');
        }
    });

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Header onBackButtonPress={handleBackButtonPress}/>
                {
                    signUpProgress == SignUpProgres.NAME && 
                    <Container title={t("nameInputLayout.title")}>
                        <NameInputLayout 
                            name={name} 
                            onNameChange={handleNameChange} 
                        />
                    </Container>
                }
                {
                    signUpProgress == SignUpProgres.BIRTH && 
                    <Container title={t("birthInputLayout.title")}>
                        <BirthInputLayout 
                            birth={birth} 
                            onBirthChange={handleBirthChange} 
                        />
                    </Container>
                }
                {
                    signUpProgress == SignUpProgres.GENDER && 
                    <Container title={t("genderInputLayout.title")}>
                        <GenderInputLayout
                            gender={gender} 
                            onGenderChange={handleGenderChange} 
                        />
                    </Container>
                }
                {
                    signUpProgress == SignUpProgres.AGREEMENT && 
                    <Container title={t("agreementInputLayout.title")}>
                        <AgreementInputLayout 
                            onAgreementChange={handleAgreementChange} 
                        />
                    </Container>
                }
                <KeyboardAvoidingView 
                    style={styles.bottomContainer} 
                    enabled={true}
                    keyboardVerticalOffset={80}
                    behavior={'padding'}
                >
                    <View style={styles.progressContainer}>
                        <ProgressBar
                            progress={signUpProgress}
                            totalProgress={4}
                            isAnimated={true}
                        />
                    </View>
                    <Button
                        title={commonT('next')}
                        onPress={handleNextButtonClick}
                        style={{
                            ...styles.nextButton, 
                            backgroundColor: isNextButtonAvailabe ? '#FFC426' : '#DDDDDD'
                        }}
                        textStyle={styles.nextButtonText}
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
            <Text style={styles.title}>{title}</Text>
            <View style={styles.inputContainer}>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    container: {
      flex: 1,
      padding: 23,
      position: 'relative'
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: '#212121'
    },
    inputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 50,
      marginBottom: 20,
    },
    bottomContainer: {
      position: 'absolute',
      bottom: 20,
      left: 20,
      right: 20,
    },
    progressContainer: {
      marginBottom: 20,
    },
    nextButton: {
      width: '100%',
      height: 60,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    nextButtonText: {
      fontSize: 17,
      fontWeight: '600'
    }
});