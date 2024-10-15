import { LocalDate } from "@js-joda/core";
import * as S from "./Header.styled";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import DOTS_ICON from "../../../../../assets/icon/dots.png";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../../types/routing";
import { useDeleteDiary } from "../../../../hooks/server/diary";
import { useFunctionWithErrorHandling } from "../../../../hooks/error";
import { useCharacterById } from "../../../../hooks/server/character";
import { useTranslationWithParentName } from "../../../../hooks/locale";

export interface HeaderProps {
    diaryId: number;
    characterId: number;
    date: LocalDate;
}

const Header = (props: HeaderProps) => {
    const { diaryId, characterId, date, ...rest } = props;

    const { mutate: deleteDiaryById } = useDeleteDiary();

    const { data: character } = useCharacterById(characterId);

    const { showActionSheetWithOptions } = useActionSheet();

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const { functionWithErrorHandling } = useFunctionWithErrorHandling();

    const t = useTranslationWithParentName("diaryTimelinePage.diaryComponent.header");

    const handleEditButtonClick = functionWithErrorHandling(() => {
        navigation.navigate("DiaryWritePage", { currentDiaryId: diaryId });
    });

    const handleDeleteButtonClick = functionWithErrorHandling(() => {
        const handleDelete = functionWithErrorHandling(() => {
            deleteDiaryById(diaryId);
        });

        Alert.alert(
            t("removeAskTitle"),
            t("removeAskDetail"),
            [
                {
                    text: '확인',
                    onPress: handleDelete,
                    style: 'destructive'
                },
                {
                    text: '취소'
                }
            ]
        );
    });

    const handleDotIconPress = functionWithErrorHandling(() => {
        const options = ["취소", "수정하기", "삭제하기"];
        const cancelButtonIndex = 0;

        showActionSheetWithOptions({
            options,
            cancelButtonIndex
        }, buttonIndex => {
            if (buttonIndex == 1)
                handleEditButtonClick();
            else if (buttonIndex == 2)
                handleDeleteButtonClick();
        });
    });

    return (
        <View style={S.styles.header}>
            <View style={S.styles.profile}>
                <Image style={S.styles.profileImage} source={{uri: character?.selectionThumbnailUrl}} />
                <View style={S.styles.profileText}>
                    <Text style={S.styles.profileName}>{character?.name}</Text>
                    <Text style={S.styles.profileDate}>{date.toString()}</Text>
                </View>
            </View>
            <TouchableOpacity style={S.styles.moreIcon} onPress={handleDotIconPress}>
                <Image source={DOTS_ICON} style={S.styles.moreShape} />
            </TouchableOpacity>
        </View>
    );
}

export default Header;