import React from 'react';
import { Text, View } from 'react-native';
import type { Character } from '../../../types/character';
import * as S from './ArtworkList.styeld';
import CharacterList from '../../../components/character/CharacterList/CharacterList';
import { FlatList, ListRenderItem } from 'react-native';

export interface ArtworkListProps {
  groupedCharacters: Record<string, Character[]>;
  selectedCharacter: Character | null;
  handleCharacterPress: (character: Character) => void;
}

const ArtworkList = (props: ArtworkListProps) => {
  const { groupedCharacters, selectedCharacter, handleCharacterPress } = props;

  const renderItem: ListRenderItem<string> = ({ item }) => (
    <View key={item}>
      <Text style={S.styles.artworkTitle}>{item}</Text>
      <CharacterList
        characters={groupedCharacters[item]}
        selectedCharacter={selectedCharacter}
        handleCharacterPress={handleCharacterPress}
        numColumns={3}
      />
    </View>
  );

  return (
    <FlatList
      data={Object.keys(groupedCharacters)}
      keyExtractor={(item) => item}
      renderItem={renderItem}
    />
  );
};

export default ArtworkList;
