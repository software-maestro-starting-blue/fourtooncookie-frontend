import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Linking, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffectWithErrorHandling, useFunctionWithErrorHandling } from '../../hooks/error';
import { APP_PRIVACY_URL, APP_TERMS_AGREEMENT_URL } from '../../config/appinfo';
import { useTranslationWithParentName } from '../../hooks/locale';
import Container from './Container';
import { useSignUpPageContext } from './SignUpPageProvider';


const AgreementInputLayout = () => {
    const { setIsAgreed } = useSignUpPageContext();

    const { functionWithErrorHandling } = useFunctionWithErrorHandling();

    const t = useTranslationWithParentName('pages.signUpPage.agreementInputLayout');

    const [isTermsAndPrivacyAgreed, setIsTermsAndPrivacyAgreed] = useState(false);
    const [isAgeOver14, setIsAgeOver14] = useState(false);

    useEffectWithErrorHandling(() => {
        setIsAgreed(isTermsAndPrivacyAgreed && isAgeOver14);
    }, [isTermsAndPrivacyAgreed, isAgeOver14]);

    const handleTermsPress = functionWithErrorHandling(() => {
        Linking.openURL(APP_TERMS_AGREEMENT_URL);
    });

    const handlePrivacyPress = functionWithErrorHandling(() => {
        Linking.openURL(APP_PRIVACY_URL);
    })

    const handleTermsAndPrivacyCheckboxChange = functionWithErrorHandling(() => 
        setIsTermsAndPrivacyAgreed(prev => !prev)
    );

    const handleAgeOver14CheckboxChange = functionWithErrorHandling(() => 
        setIsAgeOver14(prev => !prev)
    )

    return (
        <Container title={t("title")}>
            <View style={styles.agreementContainer}>
                <View style={styles.textWithCheckboxContainer}>
                    <Text style={styles.agreementText}>
                        {t("doYouAgree")}
                        <Text style={styles.linkText} onPress={handleTermsPress}>
                            {t("termsOfService")}
                        </Text>
                        ,
                        <Text style={styles.linkText} onPress={handlePrivacyPress}>
                            {t("privacyPolicy")}
                        </Text>
                    </Text>
                    <Pressable onPress={handleTermsAndPrivacyCheckboxChange} style={styles.checkbox}>
                        <MaterialIcons 
                            name={isTermsAndPrivacyAgreed ? "check-box" : "check-box-outline-blank"} 
                            size={24} 
                            color={isTermsAndPrivacyAgreed ? "#FFC426" : "#DDDDDD"} 
                        />
                    </Pressable>
                </View>
                <View style={styles.textWithCheckboxContainer}>
                    <Text style={styles.agreementText}>
                        {t("ageOver14")}
                    </Text>
                    <Pressable onPress={handleAgeOver14CheckboxChange} style={styles.checkbox}>
                        <MaterialIcons 
                            name={isAgeOver14 ? "check-box" : "check-box-outline-blank"} 
                            size={24} 
                            color={isAgeOver14 ? "#FFC426" : "#DDDDDD"} 
                        />
                    </Pressable>
                </View>
            </View>
        </Container>
    );
};

export default AgreementInputLayout;

const styles = StyleSheet.create({
    agreementContainer: {

        alignItems: 'center',
    },
    textWithCheckboxContainer: {
        flexDirection: 'row', // 텍스트와 체크박스를 한 줄에 배치
        alignItems: 'center', // 체크박스를 텍스트와 수평 정렬
    },
    agreementText: {
        fontSize: 16,
        marginRight: 10, // 체크박스와 텍스트 사이의 여백
    },
    linkText: {
        color: '#1E90FF', // 링크 색상
        textDecorationLine: 'underline', // 링크 밑줄
    },
    checkbox: {
        marginLeft: 8, // 텍스트와 체크박스 사이에 약간의 여백 추가
    },
    checkboxText: {
        fontSize: 16,
    },
});
