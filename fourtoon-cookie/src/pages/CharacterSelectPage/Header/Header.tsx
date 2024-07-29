import React from 'react';
import { View } from 'react-native';
import Tab from './Tab/Tab';
import * as S from './Header.styled';
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
                label={CharacterPaymentType.FREE_KOR}
                onPress={() => setSelectedPaymentType(CharacterPaymentType.FREE)} 
            />
            <Tab 
                isActive={selectedPaymentType === CharacterPaymentType.PAID} 
                label={CharacterPaymentType.PAID_KOR}
                onPress={() => setSelectedPaymentType(CharacterPaymentType.PAID)} 
            />
        </View>
    );
};

export default Header;
