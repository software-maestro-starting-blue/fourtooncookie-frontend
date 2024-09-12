import React from 'react';
import { FlatList, View } from 'react-native';
import CharacterItem from '../CharacterItem/CharacterItem';
import { CharacterPaymentType, type Character } from '../../../types/character';
import * as S from './CharacterList.styled';

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
            columnWrapperStyle={S.styles.columnWrapper}
            contentContainerStyle={S.styles.listContainer}
        />
    );
};

export default CharacterList;
