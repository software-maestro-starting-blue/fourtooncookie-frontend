import { Image, StyleSheet, Text, View } from "react-native";

import { useCharacters } from "../../../hooks/server/character";
import { useTranslationWithParentName } from "../../../hooks/locale";

import WORKING_ICON from "../../../../assets/icon/working.png";

export interface DiaryPaintingImageLoadingLayoutProps {
    selectedCharacterId: number;
}

const DiaryPaintingImageLoadingLayout = (props: DiaryPaintingImageLoadingLayoutProps) => {
    const { selectedCharacterId, ...rest } = props;

    const { data: characterList } = useCharacters();

    const t = useTranslationWithParentName("pages.diaryTimelinePage.diaryComponent.diaryPaintingImageLoadingLayout");

    const selectedCharacter = characterList?.find(character => character.id === selectedCharacterId);

    return (
        <View style={styles.emptyContainer}>
            <Image 
                source={WORKING_ICON}
                style={styles.characterIcon}
            />
            <Text style={styles.characterText}>
                {t("title", [], { name: selectedCharacter?.name})}
            </Text>
            <Text style={styles.estimatedTimeText}>{t("detail")}</Text>
        </View>
    );
}

export default DiaryPaintingImageLoadingLayout;

const styles = StyleSheet.create({
    emptyContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    characterIcon: {
        width: 150,
        height: 150,
        marginBottom: 10,
        borderRadius: 75,
    },
    characterText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    estimatedTimeText: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
    },
});