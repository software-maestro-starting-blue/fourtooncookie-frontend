import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from './Header';
import TabsLayout from './TabsLayout';
import ArtworkList from './ArtworkList';
import CharacterSelectPageProvider from './CharacterSelectPageProvider';


const CharacterSelectPageContent = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <TabsLayout />
            <View style={styles.separator} />
            <ArtworkList />
        </SafeAreaView>
    );
};

const CharacterSelectPage = () => {
    return (
        <CharacterSelectPageProvider>
            <CharacterSelectPageContent />
        </CharacterSelectPageProvider>
    );
}

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
