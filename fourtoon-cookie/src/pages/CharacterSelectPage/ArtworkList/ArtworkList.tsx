import React, { useMemo } from 'react';
import { Text, View, FlatList, ListRenderItem } from 'react-native';
import type { Character, CharacterPaymentType } from '../../../types/character';
import CharacterList from '../../../components/character/CharacterList/CharacterList';
import * as S from './ArtworkList.styeld';
import { useCharacterListStore } from '../../../store/characterList';

export interface ArtworkListProps {
	paymentType: CharacterPaymentType
}

const ArtworkList = (props: ArtworkListProps) => {
	const { paymentType, ...rest } = props;

	const { characterList } = useCharacterListStore();

	return useMemo(() => {

		const groupByArtworkTitle = (characters: Character[]) => {
			return characters.reduce((acc, character) => {
				if (!acc[character.artworkTitle]) {
					acc[character.artworkTitle] = [];
				}
				acc[character.artworkTitle].push(character);
				return acc;
			}, {} as Record<string, Character[]>);
		};

		const groupedCharacters = groupByArtworkTitle(
			characterList.filter(character => character.paymentType === paymentType)
		)
	
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

	}, [paymentType, characterList]);
}

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
