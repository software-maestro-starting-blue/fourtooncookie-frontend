import React from 'react';
import { View } from 'react-native';
import Tab from './Tab/Tab';
import * as S from './TabsLayout.styled';
import { FREE_KOR, PAID_KOR } from '../../../constants/character';
import { CharacterPaymentType } from '../../../types/character';

export interface TabsLayoutProps {
    selectedPaymentType: CharacterPaymentType;
    onSelectedPaymentTypeChange: (characterPaymentType: CharacterPaymentType) => void;
}

const TabsLayout = (props: TabsLayoutProps) => {
    const { selectedPaymentType, onSelectedPaymentTypeChange, ...rest } = props;
    
    return (
        <View style={S.styles.headersContainer}>
            <Tab 
                isActive={selectedPaymentType === CharacterPaymentType.FREE} 
                label={FREE_KOR}
                onPress={() => onSelectedPaymentTypeChange(CharacterPaymentType.FREE)} 
            />
            <Tab 
                isActive={selectedPaymentType === CharacterPaymentType.PAID} 
                label={PAID_KOR}
                onPress={() => onSelectedPaymentTypeChange(CharacterPaymentType.PAID)} 
            />
        </View>
    );
};

export default TabsLayout;
