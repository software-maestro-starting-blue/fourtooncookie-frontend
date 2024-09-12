import React from 'react';
import { Text, View, FlatList, ListRenderItem } from 'react-native';
import type { Character } from '../../../types/character';
import CharacterList from '../../../components/character/CharacterList/CharacterList';
import * as S from './ArtworkList.styeld';

export interface ArtworkListProps {
  groupedCharacters: Record<string, Character[]>;
}

const ArtworkList = (props: ArtworkListProps) => {
	const { groupedCharacters, ...rest } = props;

  	return (
		<FlatList
			data={Object.keys(groupedCharacters)}
			keyExtractor={(item) => item}
			renderItem={ ({ item } )=> 
				<ArtworkItem
					artworkName={item}
					artworkCharacters={groupedCharacters[item]}
				/>
			}
		/>
  	);
};

interface ArtworkItemProps {
    artworkName: string;
    artworkCharacters: Character[];
}
  
const ArtworkItem = (props: ArtworkItemProps) => {
    const { artworkName, artworkCharacters, ...rest } = props;
    return (
        <View key={artworkName} style={S.styles.artworkContainer}>
			<Text style={S.styles.artworkTitle}>{artworkName}</Text>
			<CharacterList
				characters={artworkCharacters}
				numColumns={3}
			/>
        </View>
    );
};

export default ArtworkList;
