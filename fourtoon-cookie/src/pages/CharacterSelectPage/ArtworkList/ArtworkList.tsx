import React from 'react';
import { Text, View, FlatList, ListRenderItem } from 'react-native';
import type { Character } from '../../../types/character';
import CharacterList from '../../../components/character/CharacterList/CharacterList';
import * as S from './ArtworkList.styeld';

export interface ArtworkListProps {
  groupedCharacters: Record<string, Character[]>;
  selectedCharacter: Character | null;
  handleCharacterPress: (character: Character) => void;
}

const ArtworkList = (props: ArtworkListProps) => {
	const { groupedCharacters, selectedCharacter, handleCharacterPress } = props;

  	return (
		<FlatList
			data={Object.keys(groupedCharacters)}
			keyExtractor={(item) => item}
			renderItem={ ({ item } )=> 
				<ArtworkItem
					artworkName={item}
					artworkCharacters={groupedCharacters[item]}
					selectedCharacter={selectedCharacter}
					handleCharacterPress={handleCharacterPress}
				/>
			}
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
        <View key={artworkName} style={S.styles.artworkContainer}>
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
