import React, { useEffect, useState, useMemo, useContext } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCharacters } from '../../apis/character';
import BackButton from '../../components/common/BackButton/BackButton';
import ArtworkList from './ArtworkList/ArtworkList';
import Header from './Header/Header';
import GlobalSelectionCharacterStateContext from '../../components/global/GlobalSelectionCharacterStateContext';
import { Character, CharacterPaymentType } from '../../types/character';
import { styles } from './CharacterSelectPage.styled';

const CharacterSelectPage = () => {
    const [ selectedPaymentType, setSelectedPaymentType ] = useState<CharacterPaymentType>(CharacterPaymentType.FREE);
    const { selectedCharacter, setSelectedCharacter } = useContext(GlobalSelectionCharacterStateContext);
    const [ characters, setCharacters ] = useState<Character[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<string | null>(null);

    useEffect(() => {
      const fetchCharacters = async () => {
        try {
          const characters = await getCharacters();
          setCharacters(characters);
        } catch (e) {
          console.error(e);
          setError('Failed to fetch characters.');
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

    if (loading) {
      return (
        <SafeAreaView style={styles.container}>
          <Text>Loading...</Text>
        </SafeAreaView>
      );
    }

    if (error) {
      return (
        <SafeAreaView style={styles.container}>
          <Text>{error}</Text>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <BackButton style={{ justifyContent: 'flex-start' }} />
        </View>

        <Header
          selectedPaymentType={selectedPaymentType}
          setSelectedPaymentType={setSelectedPaymentType}
        />

        <FlatList
          data={[selectedPaymentType]}
          key={selectedPaymentType}
          keyExtractor={(item) => item}
          renderItem={() => (
            <View>
              {selectedPaymentType === CharacterPaymentType.FREE
                ? <ArtworkList
                    groupedCharacters={groupedFreeCharacters}
                    selectedCharacter={selectedCharacter}
                    handleCharacterPress={handleCharacterPress}
                  />
                : <ArtworkList
                    groupedCharacters={groupedPaidCharacters}
                    selectedCharacter={selectedCharacter}
                    handleCharacterPress={handleCharacterPress}
                  />}
            </View>
          )}
        />
      </SafeAreaView>
    );
};

export default CharacterSelectPage;
