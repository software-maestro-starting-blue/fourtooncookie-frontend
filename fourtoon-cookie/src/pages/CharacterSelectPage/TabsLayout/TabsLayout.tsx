import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { FREE_KOR, PAID_KOR } from '../../../constants/character';
import { CharacterPaymentType } from '../../../types/character';

import * as S from './TabsLayout.styled';

export interface TabsLayoutProps {
    selectedPaymentType: CharacterPaymentType;
    onSelectedPaymentTypeChange: (characterPaymentType: CharacterPaymentType) => void;
}

const TabsLayout = (props: TabsLayoutProps) => {
    const { selectedPaymentType, onSelectedPaymentTypeChange, ...rest } = props;
    
    return (
        <View style={S.styles.headersContainer}>
            {
                [
                    { type: CharacterPaymentType.FREE, label: FREE_KOR},
                    //{ type: CharacterPaymentType.PAID, label: PAID_KOR}
                ].map((item) => (
                    <Tab
                        isActive={selectedPaymentType === item.type}
                        label={item.label}
                        onPress={() => onSelectedPaymentTypeChange(item.type)}
                    />
                ))
            }
        </View>
    );
};

export default TabsLayout;

interface TabProps {
    isActive: boolean;
    label: string;
    onPress: () => void;
}

const Tab = (props: TabProps) => {
    const { isActive, label, onPress, ...rest } = props;

    return (
        <TouchableOpacity onPress={onPress} style={[S.styles.tab, isActive && S.styles.selectedTab ]}>
            <Text style={[S.styles.tabText, isActive && S.styles.activeTabText]}>{label}</Text>
        </TouchableOpacity>
    );
};
