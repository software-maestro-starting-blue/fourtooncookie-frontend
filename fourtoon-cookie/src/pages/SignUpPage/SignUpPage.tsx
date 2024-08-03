import { useContext, useEffect, useRef, useState } from "react";
import { Gender } from "../../types/gender";
import ProgressBar from "../../components/common/ProgressBar/ProgressBar";
import { KeyboardAvoidingView, Platform, SafeAreaView, Text, View } from "react-native";
import * as S from "./SignUpPage.styled";
import Header from "./Header/Header";
import Button from "../../components/common/Button/Button";
import NameInputLayout from "./NameInputLayout/NameInputLayout";
import BirthInputLayout from "./BirthInputLayout/BirthInputLayout";
import GenderInputLayout from "./GenderInputLayout/GenderInputLayout";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../constants/routing";
import GlobalJwtTokenStateContext from "../../components/global/GlobalJwtToken/GlobalJwtTokenStateContext";
import { patchMember } from "../../apis/member";


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

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const jwtContext = useContext(GlobalJwtTokenStateContext);

    const isNextButtonAvailabe: boolean = 
        (signUpProgress == SignUpProgres.NAME && name.length > 0)
        || (signUpProgress == SignUpProgres.BIRTH && birth != null)
        || (signUpProgress == SignUpProgres.GENDER && gender != null);
    
    useEffect(() => {
        if (! jwtContext.jwtToken) {
            navigation.navigate('IntroPage');
        }
        
    }, [jwtContext, navigation]);

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
            if (! gender) return;

            try {
                patchMember(name, birth, gender, jwtContext);
            } catch (e) {
                console.error("patchMember error : ", e);
                throw Error("등록에 실패했습니다.");
            }

            navigation.navigate('DiaryTimelinePage');
        }
    }

    return (
        <SafeAreaView style={S.styles.safeArea}>
            <View style={S.styles.container}>
                <Header />
                {
                    signUpProgress == SignUpProgres.NAME && 
                    <NameInputLayout 
                        name={name} 
                        onNameChange={handleNameChange} 
                        titleStyle={S.styles.title}
                        containerStyle={S.styles.inputContainer}
                    />
                }
                {
                    signUpProgress == SignUpProgres.BIRTH && 
                    <BirthInputLayout 
                        birth={birth} 
                        onBirthChange={handleBirthChange} 
                        titleStyle={S.styles.title}
                        containerStyle={S.styles.inputContainer}
                    />
                }
                {
                    signUpProgress == SignUpProgres.GENDER && 
                    <GenderInputLayout 
                        gender={gender} 
                        onGenderChange={handleGenderChange} 
                        titleStyle={S.styles.title}
                        containerStyle={S.styles.inputContainer}
                    />
                }
                <View style={S.styles.bottomContainer} >
                    <View style={S.styles.progressContainer}>
                        <ProgressBar
                            progress={signUpProgress}
                            totalProgress={3}
                            isAnimated={true}
                        />
                    </View>
                    <Button
                        title="다음"
                        onPress={handleNextButtonClick}
                        style={{...S.styles.nextButton, backgroundColor: isNextButtonAvailabe ? '#FFC426' : '#DDDDDD'}}
                        textStyle={S.styles.nextButtonText}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

export default SignUpPage;