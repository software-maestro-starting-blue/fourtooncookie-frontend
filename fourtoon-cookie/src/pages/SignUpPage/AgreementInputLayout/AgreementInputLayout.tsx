import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Linking } from 'react-native';
import * as S from "./AgreementInputLayout.style";
import { MaterialIcons } from '@expo/vector-icons'; // 아이콘 사용
import { useEffectWithErrorHandling } from '../../../hooks/error';
import { APP_PRIVACY_URL, APP_TERMS_AGREEMENT_URL } from '../../../config/appinfo';

export interface AgreementInputLayoutProps {
    onAgreementChange: (isAgreed: boolean) => void;
}

const AgreementInputLayout = (props: AgreementInputLayoutProps) => {
    const { onAgreementChange, ...rest } = props;
    const [isTermsAndPrivacyAgreed, setIsTermsAndPrivacyAgreed] = useState(false);
    const [isAgeOver14, setIsAgeOver14] = useState(false);

    useEffectWithErrorHandling(() => {
        onAgreementChange(isTermsAndPrivacyAgreed && isAgeOver14);
    }, [isTermsAndPrivacyAgreed, isAgeOver14]);

    const handleTermsPress = () => {
        Linking.openURL(APP_TERMS_AGREEMENT_URL);
    };

    const handlePrivacyPress = () => {
        Linking.openURL(APP_PRIVACY_URL);
    }

    const handleTermsAndPrivacyCheckboxChange = () => {
        setIsTermsAndPrivacyAgreed(prev => !prev);
    };

    const handleAgeOver14CheckboxChange = () => {
        setIsAgeOver14(prev => !prev);
    }

    return (
        <View style={S.styles.agreementContainer}>
            <View style={S.styles.textWithCheckboxContainer}>
                <Text style={S.styles.agreementText}>
                    서비스{" "}
                    <Text style={S.styles.linkText} onPress={handleTermsPress}>
                        약관
                    </Text>
                    {" "}및{" "}
                    <Text style={S.styles.linkText} onPress={handlePrivacyPress}>
                        개인정보처리동의서
                    </Text>에 동의하십니까?
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
                    만 14세 이상입니다.
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
