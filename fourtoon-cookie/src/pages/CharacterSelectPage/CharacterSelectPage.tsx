import React, { useEffect, useState, useMemo, useContext } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArtworkList from './ArtworkList/ArtworkList';
import TabsLayout from './TabsLayout/TabsLayout';
import { Character, CharacterPaymentType } from '../../types/character';
import * as S from './CharacterSelectPage.styled';
import Header from './Header/Header';
import { useCharacterListStore } from '../../store/characterList';
import { useSelectedCharacterStore } from '../../store/selectedCharacter';

const CharacterSelectPage = () => {
    const [ selectedPaymentType, setSelectedPaymentType ] = useState<CharacterPaymentType>(CharacterPaymentType.FREE);
    const [ loading, setLoading ] = useState<boolean>(true);

    const { characterList, updateCharacterList } = useCharacterListStore();
    const { selectedCharacter, setSelectedCharacter } = useSelectedCharacterStore();

    useEffect(() => {
        if (! loading) return;

        setLoading(false);
        if (! characterList || characterList.length === 0) {
            updateCharacterList();
        }
        
    }, [loading, characterList]);
    
    const groupByArtworkTitle = (characters: Character[]) => {
		return characters.reduce((acc, character) => {
			if (!acc[character.artworkTitle]) {
				acc[character.artworkTitle] = [];
			}
			acc[character.artworkTitle].push(character);
			return acc;
		}, {} as Record<string, Character[]>);
    };

    const getCharactersByType = (type: CharacterPaymentType, characters: Character[]) => 
      	characters.filter(character => 
			type === CharacterPaymentType.FREE 
			? character.paymentType === CharacterPaymentType.FREE
			: character.paymentType === CharacterPaymentType.PAID
		);
      
    const groupedFreeCharacters = useMemo(() => groupByArtworkTitle(getCharactersByType(CharacterPaymentType.FREE, characterList)), [characterList]);
    const groupedPaidCharacters = useMemo(() => groupByArtworkTitle(getCharactersByType(CharacterPaymentType.PAID, characterList)), [characterList]);

    const handleCharacterPress = (character: Character) => {
        setSelectedCharacter(character);
    };

    const handleSelectedPaymentTypeChange = (characterPaymentType: CharacterPaymentType) => {
        setSelectedPaymentType(characterPaymentType);
    }


    return (
        <SafeAreaView style={S.styles.container}>
            <Header />
            <TabsLayout
                selectedPaymentType={selectedPaymentType}
                onSelectedPaymentTypeChange={handleSelectedPaymentTypeChange}
            />
            <View style={S.styles.separator} />
                {
					(selectedPaymentType === CharacterPaymentType.FREE) &&
					<ArtworkList
                        groupedCharacters={groupedFreeCharacters}
                        selectedCharacter={selectedCharacter}
                        handleCharacterPress={handleCharacterPress}
                    />
				}
				{
					(selectedPaymentType === CharacterPaymentType.PAID) &&
					<ArtworkList
                        groupedCharacters={groupedPaidCharacters}
                        selectedCharacter={selectedCharacter}
                        handleCharacterPress={handleCharacterPress}
                    />
				}
        </SafeAreaView>
    );
};

export default CharacterSelectPage;
