import React, { useEffect, useState, useMemo, useContext } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCharacters } from '../../apis/character';
import GlobalSelectionCharacterStateContext from '../../components/global/GlobalSelectionCharacter/GlobalSelectionCharacterStateContext';
import ArtworkList from './ArtworkList/ArtworkList';
import TabsLayout from './TabsLayout/TabsLayout';
import { Character, CharacterPaymentType } from '../../types/character';
import * as S from './CharacterSelectPage.styled';
import { RootStackParamList } from '../../constants/routing';
import GlobalJwtTokenStateContext from '../../components/global/GlobalJwtToken/GlobalJwtTokenStateContext';
import GlobalErrorInfoStateContext from '../../components/global/GlobalError/GlobalErrorInfoStateContext';
import { GlobalErrorInfoType } from '../../types/error';
import Header from './Header/Header';

const CharacterSelectPage = () => {
    const [ selectedPaymentType, setSelectedPaymentType ] = useState<CharacterPaymentType>(CharacterPaymentType.FREE);
    const [ characters, setCharacters ] = useState<Character[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);

    const { selectedCharacter, setSelectedCharacter } = useContext(GlobalSelectionCharacterStateContext);
    const jwtContext = useContext(GlobalJwtTokenStateContext);
	const { errorInfo, setErrorInfo } = useContext(GlobalErrorInfoStateContext);

    useEffect(() => {
		const fetchCharacters = async () => {
			try {
                const characters = await getCharacters(jwtContext);
                setCharacters(characters);
			} catch (e) {
                if (e instanceof Error) {
                    setErrorInfo({
                        type: GlobalErrorInfoType.MODAL,
                        error: e
                    });
                }
			} finally {
			    setLoading(false);
			}
		};

		fetchCharacters();
    }, []);

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
      
    const groupedFreeCharacters = useMemo(() => groupByArtworkTitle(getCharactersByType(CharacterPaymentType.FREE, characters)), [characters]);
    const groupedPaidCharacters = useMemo(() => groupByArtworkTitle(getCharactersByType(CharacterPaymentType.PAID, characters)), [characters]);

    const handleCharacterPress = (character: Character) => {
        setSelectedCharacter(character);
    };

    const handleSelectedPaymentTypeChange = (characterPaymentType: CharacterPaymentType) => {
        setSelectedPaymentType(characterPaymentType);
    }

    if (loading) {
        return (
            <SafeAreaView style={S.styles.container}>
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={S.styles.container}>
            <Header />
            <TabsLayout
                selectedPaymentType={selectedPaymentType}
                onSelectedPaymentTypeChange={handleSelectedPaymentTypeChange}
            />
            <View style={S.styles.separator} />
            <View>
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
            </View>
        </SafeAreaView>
    );
};

export default CharacterSelectPage;
