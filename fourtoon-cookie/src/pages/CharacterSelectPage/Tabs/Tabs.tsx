import React from 'react';
import { View } from 'react-native';
import Tab from './Tab/Tab';
import * as S from './Tabs.styled';
import { FREE_KOR, PAID_KOR } from '../../../constants/character';
import { CharacterPaymentType } from '../../../types/character';

export interface HeaderProps {
    selectedPaymentType: CharacterPaymentType;
    setSelectedPaymentType: (category: CharacterPaymentType) => void;
}

const Header = (props: HeaderProps) => {
    const { selectedPaymentType, setSelectedPaymentType, ...rest } = props;
    
    return (
        <View style={S.styles.headersContainer}>
            <Tab 
                isActive={selectedPaymentType === CharacterPaymentType.FREE} 
                label={FREE_KOR}
                onPress={() => setSelectedPaymentType(CharacterPaymentType.FREE)} 
            />
            <Tab 
                isActive={selectedPaymentType === CharacterPaymentType.PAID} 
                label={PAID_KOR}
                onPress={() => setSelectedPaymentType(CharacterPaymentType.PAID)} 
            />
        </View>
    );
};

export default Header;
