import { LocalDate } from "@js-joda/core";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DOTS_ICON from "../../../../assets/icon/dots.png";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../types/routing";
import { useDeleteDiary } from "../../../hooks/server/diary";
import { useFunctionWithErrorHandling } from "../../../hooks/error";
import { useCharacterById } from "../../../hooks/server/character";
import { useTranslationWithParentName } from "../../../hooks/locale";

export interface DiaryInfoLayoutProps {
    diaryId: number;
    characterId: number;
    date: LocalDate;
}

const DiaryInfoLayout = (props: DiaryInfoLayoutProps) => {
    const { diaryId, characterId, date, ...rest } = props;

    const { mutate: deleteDiaryById } = useDeleteDiary();

    const { data: character } = useCharacterById(characterId);

    const { showActionSheetWithOptions } = useActionSheet();

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const { functionWithErrorHandling } = useFunctionWithErrorHandling();

    const t = useTranslationWithParentName("pages.diaryTimelinePage.diaryComponent.header");

    const commonT = useTranslationWithParentName("common");

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
                    text: commonT("confirm"),
                    onPress: handleDelete,
                    style: 'destructive'
                },
                {
                    text: commonT("cancel"),
                }
            ]
        );
    });

    const handleDotIconPress = functionWithErrorHandling(() => {
        const options = [commonT("cancel"), commonT("edit"), commonT("remove")];
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
        <View style={styles.header}>
            <View style={styles.profile}>
                <Image style={styles.profileImage} source={{uri: character?.selectionThumbnailUrl}} />
                <View style={styles.profileText}>
                    <Text style={styles.profileName}>{character?.name}</Text>
                    <Text style={styles.profileDate}>{date.toString()}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.moreIcon} onPress={handleDotIconPress}>
                <Image source={DOTS_ICON} style={styles.moreShape} />
            </TouchableOpacity>
        </View>
    );
}

export default DiaryInfoLayout;

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 40,
      },
      profile: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        width: '35%',
        height: 40,
      },
      profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.03)',
      },
      profileText: {
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        width: 'auto',
        height: 40,
      },
      profileName: {
        fontFamily: 'Pretendard',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 20,
        color: '#212121',
      },
      profileDate: {
        fontFamily: 'Pretendard',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 16,
        color: '#999999',
      },
      moreIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 36,
        height: 36,
        backgroundColor: '#F7F7F7',
        borderRadius: 20,
      },
      moreShape: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
      }
});