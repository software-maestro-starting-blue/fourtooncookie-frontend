import React from 'react';
import { View } from 'react-native';
import Tab from './Tab/Tab';
import * as S from './Header.styled';

interface HeaderProps {
    selectedCategory: 'free' | 'paid';
    setSelectedCategory: (category: 'free' | 'paid') => void;
}

const Header = (props: HeaderProps) => {
    const { selectedCategory, setSelectedCategory } = props;
    
    return (
        <View style={S.styles.headersContainer}>
            <Tab 
                isActive={selectedCategory === 'free'} 
                label="무료" 
                onPress={() => setSelectedCategory('free')} 
            />
            <Tab 
                isActive={selectedCategory === 'paid'} 
                label="유료" 
                onPress={() => setSelectedCategory('paid')} 
            />
        </View>
    );
};

export default Header;
