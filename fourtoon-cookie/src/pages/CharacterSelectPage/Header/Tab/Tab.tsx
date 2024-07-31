import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import * as S from './Tab.styled';

export interface TabProps {
    isActive: boolean;
    label: string;
    onPress: () => void;
}

const Tab = (props: TabProps) => {
    const { isActive, label, onPress, ...rest } = props;

    return (
        <TouchableOpacity onPress={onPress} style={S.styles.tab}>
            <Text style={[S.styles.tabText, isActive && S.styles.activeTabText]}>{label}</Text>
        </TouchableOpacity>
    );
};

export default Tab;
