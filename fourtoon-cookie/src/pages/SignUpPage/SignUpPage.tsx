import { ReactNode, useEffect, useState } from "react";
import { Gender } from "../../types/gender";
import ProgressBar from "../../components/common/ProgressBar";
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
import SignUpPageProvider, { SignUpProgres, useSignUpPageContext } from "./SignUpPageProvider";


const SignUpPageContent = () => {
    const { name, birth, gender, isAgreed, signUpProgress, setSignUpProgress, isNextAvailabe } = useSignUpPageContext();

    const { signup } = useAccountState();

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const { functionWithErrorHandling } = useFunctionWithErrorHandling();

    const commonT = useTranslationWithParentName('common');


    const handleNextButtonClick = functionWithErrorHandling(() => {
        if (!isNextAvailabe) return;

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
                <Header/>
                {signUpProgress == SignUpProgres.NAME && <NameInputLayout/>}
                {signUpProgress == SignUpProgres.BIRTH && <BirthInputLayout />}
                {signUpProgress == SignUpProgres.GENDER && <GenderInputLayout/>}
                {signUpProgress == SignUpProgres.AGREEMENT && <AgreementInputLayout />}
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
                            backgroundColor: isNextAvailabe ? '#FFC426' : '#DDDDDD'
                        }}
                        textStyle={styles.nextButtonText}
                    />
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    );
};

const SignUpPage = () => {
    return (
        <SignUpPageProvider>
            <SignUpPageContent/>
        </SignUpPageProvider>
    );
}

export default SignUpPage;


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