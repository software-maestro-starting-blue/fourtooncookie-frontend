import React from 'react';
import { Text, View } from 'react-native';
import { Character } from '../../../types/character';
import * as S from './ArtworkList.styeld';
import CharacterList from '../CharacterList/CharacterList';

export interface ArtworkListProps {
  groupedCharacters: Record<string, Character[]>;
  selectedCharacter: Character | null;
  handleCharacterPress: (character: Character) => void;
}

const ArtworkList = (props : ArtworkListProps) => {
    const { groupedCharacters, selectedCharacter, handleCharacterPress } = props;
    
    return Object.keys(groupedCharacters).map(artworkTitle => (
      <View key={artworkTitle}>
        <Text style={S.styles.artworkTitle}>{artworkTitle}</Text>
        <CharacterList
          characters={groupedCharacters[artworkTitle]}
          selectedCharacter={selectedCharacter}
          handleCharacterPress={handleCharacterPress}
        />
      </View>
    ));
};

export default ArtworkList;
