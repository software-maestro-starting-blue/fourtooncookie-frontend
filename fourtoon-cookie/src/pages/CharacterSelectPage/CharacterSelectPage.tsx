import React, { useEffect, useState, useMemo } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCharacters } from '../../apis/character';
import BackButton from '../../components/common/BackButton/BackButton';
import CharacterItem from './CharacterItem/CharacterItem';
import Header from './Header/Hader';
import { FREE_CHARACTER_VISION_TYPES, PAID_CHARACTER_VISION_TYPES, FREE, PAID, CharacterCategory } from '../../constants/character';
import type { Character } from '../../types/character';
import { styles } from './CharacterSelectPage.styled';

const CharacterSelectPage = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<CharacterCategory>(FREE);
    const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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

    const renderCharacter = ({ item }: { item: Character }) => (
        <CharacterItem
            character={item}
            isSelected={selectedCharacter?.id === item.id}
            onPress={() => handleCharacterPress(item)}
        />
    );

    const renderCategory = (groupedCharacters: Record<string, Character[]>) => {
        return Object.keys(groupedCharacters).map(artworkTitle => (
            <View key={artworkTitle}>
                <Text style={styles.artworkTitle}>{artworkTitle}</Text>
                <FlatList
                    data={groupedCharacters[artworkTitle]}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderCharacter}
                    numColumns={3}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.flatListContent}
                />
            </View>
        ));
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
                            ? renderCategory(groupedFreeCharacters)
                            : renderCategory(groupedPaidCharacters)}
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

export default CharacterSelectPage;
