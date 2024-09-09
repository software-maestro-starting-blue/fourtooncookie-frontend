import React, { useState } from 'react';
import { View, Text, Pressable, Linking } from 'react-native';
import * as S from "./AgreementInputLayout.style";
import { MaterialIcons } from '@expo/vector-icons'; // 아이콘 사용
import { NOTION_TERMS_AND_POLICY_LINK } from '../../../constants/agreement';

export interface AgreementInputLayoutProps {
    onAgreementChange: (isAgreed: boolean) => void;
}

const AgreementInputLayout = (props: AgreementInputLayoutProps) => {
    const { onAgreementChange, ...rest } = props;
    const [isAgreed, setIsAgreed] = useState(false);

    const handleCheckboxChange = () => {
        const newAgreementState = !isAgreed;
        setIsAgreed(newAgreementState);
        onAgreementChange(newAgreementState);
    };

    const handleTermsPress = () => {
        Linking.openURL(NOTION_TERMS_AND_POLICY_LINK);
    };

    const handlePrivacyPress = () => {
        Linking.openURL(NOTION_TERMS_AND_POLICY_LINK);
    };

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
                        개인정보 보호정책
                    </Text>에 동의하십니까?
                </Text>
                <Pressable onPress={handleCheckboxChange} style={S.styles.checkbox}>
                    <MaterialIcons 
                        name={isAgreed ? "check-box" : "check-box-outline-blank"} 
                        size={24} 
                        color={isAgreed ? "#FFC426" : "#DDDDDD"} 
                    />
                </Pressable>
            </View>
        </View>
    );
};

export default AgreementInputLayout;
