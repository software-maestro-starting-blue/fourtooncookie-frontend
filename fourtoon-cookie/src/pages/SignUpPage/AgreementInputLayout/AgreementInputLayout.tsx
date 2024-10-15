import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Linking } from 'react-native';
import * as S from "./AgreementInputLayout.style";
import { MaterialIcons } from '@expo/vector-icons';
import { useEffectWithErrorHandling, useFunctionWithErrorHandling } from '../../../hooks/error';
import { APP_PRIVACY_URL, APP_TERMS_AGREEMENT_URL } from '../../../config/appinfo';
import { useTranslationWithParentName } from '../../../hooks/locale';

export interface AgreementInputLayoutProps {
    onAgreementChange: (isAgreed: boolean) => void;
}

const AgreementInputLayout = (props: AgreementInputLayoutProps) => {
    const { onAgreementChange, ...rest } = props;
    const [isTermsAndPrivacyAgreed, setIsTermsAndPrivacyAgreed] = useState(false);
    const [isAgeOver14, setIsAgeOver14] = useState(false);

    const { functionWithErrorHandling } = useFunctionWithErrorHandling();

    const t = useTranslationWithParentName('pages.signUpPage.agreementInputLayout');

    useEffectWithErrorHandling(() => {
        onAgreementChange(isTermsAndPrivacyAgreed && isAgeOver14);
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
        <View style={S.styles.agreementContainer}>
            <View style={S.styles.textWithCheckboxContainer}>
                <Text style={S.styles.agreementText}>
                    {t("doYouAgree")}
                    <Text style={S.styles.linkText} onPress={handleTermsPress}>
                        {t("termsOfService")}
                    </Text>
                    ,
                    <Text style={S.styles.linkText} onPress={handlePrivacyPress}>
                        {t("privacyPolicy")}
                    </Text>
                </Text>
                <Pressable onPress={handleTermsAndPrivacyCheckboxChange} style={S.styles.checkbox}>
                    <MaterialIcons 
                        name={isTermsAndPrivacyAgreed ? "check-box" : "check-box-outline-blank"} 
                        size={24} 
                        color={isTermsAndPrivacyAgreed ? "#FFC426" : "#DDDDDD"} 
                    />
                </Pressable>
            </View>
            <View style={S.styles.textWithCheckboxContainer}>
                <Text style={S.styles.agreementText}>
                    {t("ageOver14")}
                </Text>
                <Pressable onPress={handleAgeOver14CheckboxChange} style={S.styles.checkbox}>
                    <MaterialIcons 
                        name={isAgeOver14 ? "check-box" : "check-box-outline-blank"} 
                        size={24} 
                        color={isAgeOver14 ? "#FFC426" : "#DDDDDD"} 
                    />
                </Pressable>
            </View>
        </View>
    );
};

export default AgreementInputLayout;
