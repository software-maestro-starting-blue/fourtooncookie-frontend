import React, { useMemo } from 'react';
import { Text, View, FlatList } from 'react-native';
import CharacterList from '../../../components/character/CharacterList/CharacterList';
import type { Character, CharacterPaymentType } from '../../../types/character';

import * as S from './ArtworkList.styeld';
import { useCharacters } from '../../../hooks/server/character';

export interface ArtworkListProps {
	paymentType: CharacterPaymentType
}

const ArtworkList = (props: ArtworkListProps) => {
	const { paymentType, ...rest } = props;

	const { data: characterList } = useCharacters();

	return useMemo(() => {

		if (!characterList) {
			return null;
		}

		const groupByArtworkTitle = (characters: Character[]) => {
			return characters.reduce((acc, character) => {
				if (!acc[character.artworkTitle]) {
					acc[character.artworkTitle] = [];
				}
				acc[character.artworkTitle].push(character);
				return acc;
			}, {} as Record<string, Character[]>);
		};

		const charactersGroupedByArtworkTitle = groupByArtworkTitle(
			characterList?.filter(character => character.paymentType === paymentType)
		)
	
		return (
			<FlatList
				data={Object.keys(charactersGroupedByArtworkTitle)}
				keyExtractor={(artworkTitle) => artworkTitle}
				renderItem={ ({ item })=> 
					<ArtworkItem
						artworkTitle={item}
						artworkCharacters={charactersGroupedByArtworkTitle[item]}
					/>
				}
			/>
		);

	}, [paymentType, characterList]);
}

interface ArtworkItemProps {
    artworkTitle: string;
    artworkCharacters: Character[];
}
  
const ArtworkItem = (props: ArtworkItemProps) => {
    const { artworkTitle, artworkCharacters, ...rest } = props;
    return (
        <View key={artworkTitle} style={S.styles.artworkContainer}>
			<Text style={S.styles.artworkTitle}>{artworkTitle}</Text>
			<CharacterList
				characters={artworkCharacters}
				numColumns={3}
			/>
        </View>
    );
};

export default ArtworkList;
