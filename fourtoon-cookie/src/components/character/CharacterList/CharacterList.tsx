import React from 'react';
import { FlatList, View } from 'react-native';
import CharacterItem from '../CharacterItem/CharacterItem';
import type { Character } from '../../../types/character';
import * as S from './CharacterList.styled';

export interface CharacterListProps {
  characters: Character[];
  selectedCharacter: Character | null;
  handleCharacterPress: (character: Character) => void;
  numColumns: number;
}

const CharacterList = (props: CharacterListProps) => {
    const { characters, selectedCharacter, handleCharacterPress, numColumns, ...rest } = props;

    return (
        <FlatList
        data={characters}
        keyExtractor={(character) => character.id.toString()}
        renderItem={({ item }) => (
            <CharacterItem
            character={item}
            isSelected={selectedCharacter?.id === item.id}
            onPress={() => handleCharacterPress(item)}
            />
        )}
        numColumns={numColumns}
        columnWrapperStyle={S.styles.row}
        contentContainerStyle={S.styles.flatListContent}
        />
    );
};

export default CharacterList;
