import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import CharacterItem from './CharacterItem';
import { CharacterPaymentType, type Character } from '../../types/character';

export interface CharacterListProps {
  characters: Character[];
  numColumns: number;
}

const CharacterList = (props: CharacterListProps) => {
    const { characters, numColumns, ...rest } = props;

    return (
        <FlatList
            data={characters}
            keyExtractor={(character) => character.id.toString()}
            renderItem={({ item }) => (
                <CharacterItem
                    character={item}
                />
            )}
            numColumns={numColumns}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.listContainer}
        />
    );
};

export default CharacterList;

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'flex-start',
        padding: 0,
        width: "100%",
        height: "auto",
    },
    columnWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: "100%",
        height: "auto",
    },
});
