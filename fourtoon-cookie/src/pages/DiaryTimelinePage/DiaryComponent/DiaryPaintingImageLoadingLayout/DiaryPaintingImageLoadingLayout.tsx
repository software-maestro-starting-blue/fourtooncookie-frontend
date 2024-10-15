import { Image, Text, View } from "react-native";

import * as S from "./DiaryPaintingImageLoadingLayout.styled";
import { useCharacters } from "../../../../hooks/server/character";
import { useTranslationWithParentName } from "../../../../hooks/locale";

export interface DiaryPaintingImageLoadingLayoutProps {
    selectedCharacterId: number;
}

const DiaryPaintingImageLoadingLayout = (props: DiaryPaintingImageLoadingLayoutProps) => {
    const { selectedCharacterId, ...rest } = props;

    const { data: characterList } = useCharacters();

    const t = useTranslationWithParentName("diaryTimelinePage.diaryComponent.diaryPaintingImageLoadingLayout");

    const selectedCharacter = characterList?.find(character => character.id === selectedCharacterId);

    const defaultSelectCharacterImageUrl = require('../../../../../assets/logo/logo-3.png');

    return (
        <View style={S.styles.emptyContainer}>
            <Image 
                source={selectedCharacter ? { uri: selectedCharacter.selectionThumbnailUrl } : defaultSelectCharacterImageUrl}
                style={S.styles.characterIcon}
            />
            <Text style={S.styles.characterText}>
                {t("title", [], { name: selectedCharacter?.name})}
            </Text>
            <Text style={S.styles.estimatedTimeText}>{t("detail")}</Text>
        </View>
    );
}

export default DiaryPaintingImageLoadingLayout;