import React, { useEffect, useState, useMemo, useContext } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {NavigationProp, useNavigation} from "@react-navigation/native";
import { getCharacters } from '../../apis/character';
import BackButton from '../../components/common/BackButton/BackButton';
import GlobalSelectionCharacterStateContext from '../../components/global/GlobalSelectionCharacter/GlobalSelectionCharacterStateContext';
import ArtworkList from './ArtworkList/ArtworkList';
import Header from './Header/Header';
import { Character, CharacterPaymentType } from '../../types/character';
import * as S from './CharacterSelectPage.styled';
import { RootStackParamList } from '../../constants/routing';

const CharacterSelectPage = () => {
    const [ selectedPaymentType, setSelectedPaymentType ] = useState<CharacterPaymentType>(CharacterPaymentType.FREE);
    const { selectedCharacter, setSelectedCharacter } = useContext(GlobalSelectionCharacterStateContext);
    const [ characters, setCharacters ] = useState<Character[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<string | null>(null);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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

    useEffect(() => {
        if (error) {
            navigation.goBack();
        }
    }, [error, navigation]);

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
            <SafeAreaView style={S.styles.container}>
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={S.styles.container}>
            <View style={S.styles.header}>
                <BackButton style={{ justifyContent: 'flex-start' }} />
            </View>

            <Header
                selectedPaymentType={selectedPaymentType}
                setSelectedPaymentType={setSelectedPaymentType}
            />

            <View>
                {selectedPaymentType === CharacterPaymentType.FREE ? (
                    <ArtworkList
                        groupedCharacters={groupedFreeCharacters}
                        selectedCharacter={selectedCharacter}
                        handleCharacterPress={handleCharacterPress}
                    />
                ) : (
                    <ArtworkList
                        groupedCharacters={groupedPaidCharacters}
                        selectedCharacter={selectedCharacter}
                        handleCharacterPress={handleCharacterPress}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

export default CharacterSelectPage;
