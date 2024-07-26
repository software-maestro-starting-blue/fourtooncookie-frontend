import React from 'react';
import { View } from 'react-native';
import Tab from './Tab/Tab';
import * as S from './Header.styled';
import { FREE, PAID, FREE_KOR, PAID_KOR, CharacterCategory } from '../../../constants/character';

interface HeaderProps {
    selectedCategory: CharacterCategory;
    setSelectedCategory: (category: CharacterCategory) => void;
}

const Header = (props: HeaderProps) => {
    const { selectedCategory, setSelectedCategory } = props;
    
    return (
        <View style={S.styles.headersContainer}>
            <Tab 
                isActive={selectedCategory === FREE} 
                label={FREE_KOR}
                onPress={() => setSelectedCategory(FREE)} 
            />
            <Tab 
                isActive={selectedCategory === PAID} 
                label={PAID_KOR}
                onPress={() => setSelectedCategory(PAID)} 
            />
        </View>
    );
};

export default Header;
