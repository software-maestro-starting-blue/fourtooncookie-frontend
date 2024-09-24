import { LocalDate } from "@js-joda/core";
import * as S from "./Header.styled";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import DOTS_ICON from "../../../../../assets/icon/dots.png";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useSelectedCharacterStore } from "../../../../store/selectedCharacter";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../../constants/routing";
import handleError from "../../../../error/errorhandler";
import { GlobalErrorInfoType } from "../../../../types/error";
import { useDeleteDiary } from "../../../../hooks/server/diary";

export interface HeaderProps {
    diaryId: number;
    characterId: number;
    date: LocalDate;
}

const Header = (props: HeaderProps) => {
    const { diaryId, characterId, date, ...rest } = props;

    const { mutate: deleteDiaryById } = useDeleteDiary();

    const { selectedCharacter } = useSelectedCharacterStore();

    const { showActionSheetWithOptions } = useActionSheet();

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleEditButtonClick = () => {
        navigation.navigate("DiaryWritePage", { currentDiaryId: diaryId });
    };

    const handleDeleteButtonClick = async () => {
        const handleDelete = async () => {
            try {
                deleteDiaryById(diaryId);
            } catch (error) {
                if (error instanceof Error) {
                    handleError(
                        error
                    );
                }
            }
        }

        Alert.alert(
            '정말 삭제하겠습니까?',
            '삭제하시면 기록이 완전 삭제됩니다.',
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
    }

    const handleDotIconPress = () => {
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
    }

    return (
        <View style={S.styles.header}>
            <View style={S.styles.profile}>
                <Image style={S.styles.profileImage} source={{uri: selectedCharacter?.selectionThumbnailUrl}} />
                <View style={S.styles.profileText}>
                    <Text style={S.styles.profileName}>{selectedCharacter?.name}</Text>
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