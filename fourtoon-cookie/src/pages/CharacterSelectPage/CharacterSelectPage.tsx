import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CharacterPaymentType } from '../../types/character';

import Header from './Header/Header';
import TabsLayout from './TabsLayout/TabsLayout';
import ArtworkList from './ArtworkList/ArtworkList';

import * as S from './CharacterSelectPage.styled';
import { functionWithErrorHandling } from '../../hooks/error';


const CharacterSelectPage = () => {
    const [ selectedPaymentType, setSelectedPaymentType ] = useState<CharacterPaymentType>(CharacterPaymentType.FREE);

    const handleSelectedPaymentTypeChange = functionWithErrorHandling((characterPaymentType: CharacterPaymentType) => {
        setSelectedPaymentType(characterPaymentType);
    });

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
