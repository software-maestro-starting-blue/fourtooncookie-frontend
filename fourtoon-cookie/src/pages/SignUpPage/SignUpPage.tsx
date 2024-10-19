import ProgressBar from "../../components/common/ProgressBar";
import { SafeAreaView, StyleSheet, View } from "react-native";
import Header from "./Header";
import NameInputLayout from "./NameInputLayout";
import BirthInputLayout from "./BirthInputLayout";
import GenderInputLayout from "./GenderInputLayout";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/routing";

import AgreementInputLayout from "./AgreementInputLayout";
import { useAccountState } from "../../hooks/account";
import { useFunctionWithErrorHandling } from "../../hooks/error";
import { useTranslationWithParentName } from "../../hooks/locale";
import { showSuccessToast } from "../../system/toast";
import SignUpPageProvider, { SignUpProgres, useSignUpPageContext } from "./SignUpPageProvider";
import KeyboardAwareContainer from "../../components/common/KeyboardAwareContainer";
import YellowWideButton from "../../components/common/YellowWideButton";


const SignUpPageContent = () => {
    const { name, birth, gender, isAgreed, signUpProgress, setSignUpProgress, isNextAvailabe } = useSignUpPageContext();

    const { signup } = useAccountState();

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const { functionWithErrorHandling } = useFunctionWithErrorHandling();

    const loginT = useTranslationWithParentName('login');
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

            showSuccessToast(loginT('signupSuccess'));
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
                <KeyboardAwareContainer>
                    <View style={styles.progressContainer}>
                        <ProgressBar
                            progress={signUpProgress}
                            totalProgress={4}
                            isAnimated={true}
                        />
                    </View>
                    <YellowWideButton
                        isNextAvailabe={isNextAvailabe}
                        onNextButtonClick={handleNextButtonClick}
                    />
                </KeyboardAwareContainer>
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
    progressContainer: {
      marginBottom: 20,
    },
});