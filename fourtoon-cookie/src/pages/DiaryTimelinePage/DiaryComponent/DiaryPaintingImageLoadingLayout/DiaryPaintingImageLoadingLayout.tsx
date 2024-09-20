import { Image, Text, View } from "react-native";

import * as S from "./DiaryPaintingImageLoadingLayout.styled";
import { useSelectedCharacterStore } from "../../../../store/selectedCharacter";
import { Character } from "../../../../types/character";
import { useCharacterListStore } from "../../../../store/characterList";

export interface DiaryPaintingImageLoadingLayoutProps {
    selectedCharacterId: number;
}

const DiaryPaintingImageLoadingLayout = (props: DiaryPaintingImageLoadingLayoutProps) => {
    const { selectedCharacterId, ...rest } = props;

    const { characterList } = useCharacterListStore();

    const selectedCharacter = characterList.find(character => character.id === selectedCharacterId);

    const defaultSelectCharacterImageUrl = require('../../../../../assets/logo/logo-3.png');

    return (
        <View style={S.styles.emptyContainer}>
            <Image 
                source={selectedCharacter ? { uri: selectedCharacter.selectionThumbnailUrl } : defaultSelectCharacterImageUrl}
                style={S.styles.characterIcon}
            />
            <Text style={S.styles.characterText}>
                {selectedCharacter?.name || '캐릭터'}가 그림을 그리고 있습니다!
            </Text>
            <Text style={S.styles.estimatedTimeText}>열심히 작업 중입니다. 조금만 기다려주세요!</Text>
        </View>
    );
}

export default DiaryPaintingImageLoadingLayout;