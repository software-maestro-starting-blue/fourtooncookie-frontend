import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Linking } from 'react-native';
import * as S from "./AgreementInputLayout.style";
import { MaterialIcons } from '@expo/vector-icons'; // 아이콘 사용
import { NOTION_TERMS_AND_POLICY_LINK } from '../../../constants/appinfo';

export interface AgreementInputLayoutProps {
    onAgreementChange: (isAgreed: boolean) => void;
}

const AgreementInputLayout = (props: AgreementInputLayoutProps) => {
    const { onAgreementChange, ...rest } = props;
    const [isTermsAndPrivacyAgreed, setIsTermsAndPrivacyAgreed] = useState(false);
    const [isAgeOver14, setIsAgeOver14] = useState(false);

    useEffect(() => {
        onAgreementChange(isTermsAndPrivacyAgreed && isAgeOver14);
    }, [isTermsAndPrivacyAgreed, isAgeOver14]);

    const handleTermsAndPrivacyPress = () => {
        Linking.openURL(NOTION_TERMS_AND_POLICY_LINK);
    };

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
                    <Text style={S.styles.linkText} onPress={handleTermsAndPrivacyPress}>
                        약관
                    </Text>
                    {" "}및{" "}
                    <Text style={S.styles.linkText} onPress={handleTermsAndPrivacyPress}>
                        개인정보 보호정책
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
