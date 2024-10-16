import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CharacterPaymentType } from '../../types/character';

import Header from './Header';
import TabsLayout from './TabsLayout';
import ArtworkList from './ArtworkList';

import { useFunctionWithErrorHandling } from '../../hooks/error';


const CharacterSelectPage = () => {
    const [ selectedPaymentType, setSelectedPaymentType ] = useState<CharacterPaymentType>(CharacterPaymentType.FREE);

    const { functionWithErrorHandling } = useFunctionWithErrorHandling();

    const handleSelectedPaymentTypeChange = functionWithErrorHandling((characterPaymentType: CharacterPaymentType) => {
        setSelectedPaymentType(characterPaymentType);
    });

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <TabsLayout
                selectedPaymentType={selectedPaymentType}
                onSelectedPaymentTypeChange={handleSelectedPaymentTypeChange}
            />
            <View style={styles.separator} />
            <ArtworkList
                paymentType={selectedPaymentType}
            />
        </SafeAreaView>
    );
};

export default CharacterSelectPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        position: 'relative',
        backgroundColor: '#FFFFFF',
    },
    separator: {
        width: "100%",
        height: 1,
        backgroundColor: '#F7F7F7',
        alignSelf: 'stretch',
        flexGrow: 0,
    }
});
