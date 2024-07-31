import React from 'react';
import { Text, View, FlatList, ListRenderItem } from 'react-native';
import type { Character } from '../../../types/character';
import * as S from './ArtworkList.styeld';
import CharacterList from '../../../components/character/CharacterList/CharacterList';

export interface ArtworkListProps {
  groupedCharacters: Record<string, Character[]>;
  selectedCharacter: Character | null;
  handleCharacterPress: (character: Character) => void;
}

const ArtworkList = (props: ArtworkListProps) => {
  const { groupedCharacters, selectedCharacter, handleCharacterPress } = props;

  const renderItem: ListRenderItem<string> = ({ item }) => (
    <ArtworkItem
      artworkName={item}
      artworkCharacters={groupedCharacters[item]}
      selectedCharacter={selectedCharacter}
      handleCharacterPress={handleCharacterPress}
    />
  );

  return (
    <FlatList
      data={Object.keys(groupedCharacters)}
      keyExtractor={(item) => item}
      renderItem={renderItem}
    />
  );
};

interface ArtworkItemProps {
    artworkName: string;
    artworkCharacters: Character[];
    selectedCharacter: Character | null;
    handleCharacterPress: (character: Character) => void;
}
  
const ArtworkItem = (props: ArtworkItemProps) => {
    const { artworkName, artworkCharacters, selectedCharacter, handleCharacterPress } = props;
    return (
        <View key={artworkName}>
        <Text style={S.styles.artworkTitle}>{artworkName}</Text>
        <CharacterList
            characters={artworkCharacters}
            selectedCharacter={selectedCharacter}
            handleCharacterPress={handleCharacterPress}
            numColumns={3}
        />
        </View>
    );
};

export default ArtworkList;
