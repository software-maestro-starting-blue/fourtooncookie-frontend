import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArtworkList from './ArtworkList/ArtworkList';
import TabsLayout from './TabsLayout/TabsLayout';
import { CharacterPaymentType } from '../../types/character';
import * as S from './CharacterSelectPage.styled';
import Header from './Header/Header';
import { useCharacterListStore } from '../../store/characterList';

const CharacterSelectPage = () => {
    const [ selectedPaymentType, setSelectedPaymentType ] = useState<CharacterPaymentType>(CharacterPaymentType.FREE);
    const [ loading, setLoading ] = useState<boolean>(true);

    const { characterList, updateCharacterList } = useCharacterListStore();

    useEffect(() => {
        if (! loading) return;
        setLoading(false);

        if (characterList && characterList.length > 0) return;
        updateCharacterList();
        
    }, [loading, characterList]);

    const handleSelectedPaymentTypeChange = (characterPaymentType: CharacterPaymentType) => {
        setSelectedPaymentType(characterPaymentType);
    }

    return (
        <SafeAreaView style={S.styles.container}>
            <Header />
            <TabsLayout
                selectedPaymentType={selectedPaymentType}
                onSelectedPaymentTypeChange={handleSelectedPaymentTypeChange}
            />
            <View style={S.styles.separator} />
            <ArtworkList
                paymentType={selectedPaymentType}
            />
        </SafeAreaView>
    );
};

export default CharacterSelectPage;
