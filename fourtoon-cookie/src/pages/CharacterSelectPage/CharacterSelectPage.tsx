import React, { useEffect, useState, useMemo, useContext } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCharacters } from '../../apis/character';
import BackButton from '../../components/common/BackButton/BackButton';
import ArtworkList from '../../components/character/ArtworkList/ArtworkList';
import Header from './Header/Hader';
import { FREE_CHARACTER_VISION_TYPES, PAID_CHARACTER_VISION_TYPES, FREE, PAID } from '../../constants/character';
import { CharacterCategory } from '../../types/character';
import GlobalSelectionCharacterStateContext from '../../components/global/GlobalSelectionCharacterStateContext';
import type { Character } from '../../types/character';
import { styles } from './CharacterSelectPage.styled';

const CharacterSelectPage = () => {
  const { selectedCharacter, setSelectedCharacter } = useContext(GlobalSelectionCharacterStateContext);
  const [ characters, setCharacters ] = useState<Character[]>([]);
  const [ selectedCategory, setSelectedCategory ] = useState<CharacterCategory>(FREE);
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

  const getCharactersByType = (type: CharacterCategory, characters: Character[]) => {
    const characterVisionTypes = type === FREE ? FREE_CHARACTER_VISION_TYPES : PAID_CHARACTER_VISION_TYPES;
    return characters.filter(character => characterVisionTypes.includes(character.characterVisionType));
  };

  const groupedFreeCharacters = useMemo(() => groupByArtworkTitle(getCharactersByType(FREE, characters)), [characters]);
  const groupedPaidCharacters = useMemo(() => groupByArtworkTitle(getCharactersByType(PAID, characters)), [characters]);

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
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <FlatList
        data={[selectedCategory]}
        key={selectedCategory}
        keyExtractor={(item) => item}
        renderItem={() => (
          <View>
            {selectedCategory === FREE
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
