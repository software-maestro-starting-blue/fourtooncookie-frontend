import React from 'react';
import { Text, View } from 'react-native';
import type { Character } from '../../../types/character';
import * as S from './ArtworkList.styeld';
import CharacterList from '../../../components/character/CharacterList/CharacterList';

export interface ArtworkListProps {
  groupedCharacters: Record<string, Character[]>;
  selectedCharacter: Character | null;
  handleCharacterPress: (character: Character) => void;
}

const ArtworkList = (props : ArtworkListProps) => {
    const { groupedCharacters, selectedCharacter, handleCharacterPress, ...rest } = props;
    
    return Object.keys(groupedCharacters).map(artworkTitle => (
      <View key={artworkTitle}>
        <Text style={S.styles.artworkTitle}>{artworkTitle}</Text>
        <CharacterList
          characters={groupedCharacters[artworkTitle]}
          selectedCharacter={selectedCharacter}
          handleCharacterPress={handleCharacterPress}
          numColumns={3}
        />
      </View>
    ));
};

export default ArtworkList;
