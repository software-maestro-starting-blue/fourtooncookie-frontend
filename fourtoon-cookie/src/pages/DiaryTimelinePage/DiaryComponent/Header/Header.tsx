import { LocalDate } from "@js-joda/core";
import { Character } from "../../../../types/character";
import * as S from "./Header.styled";
import { Image, Text, TouchableOpacity, View } from "react-native";
import DOTS_ICON from "../../../../../assets/icon/dots.png";
import { useActionSheet } from "@expo/react-native-action-sheet";

export interface HeaderProps {
    characterId: number;
    date: LocalDate;
    onEdit: () => void;
    onDelete: () => void;
}

const Header = (props: HeaderProps) => {
    const { characterId, date, onEdit, onDelete, ...rest } = props;

    const { showActionSheetWithOptions } = useActionSheet();

    const handleDotIconPress = () => {
        const options = ["취소", "수정하기", "삭제하기"];
        const cancelButtonIndex = 0;

        showActionSheetWithOptions({
            options,
            cancelButtonIndex
        }, buttonIndex => {
            if (buttonIndex == 1)
                onEdit();
            else if (buttonIndex == 2)
                onDelete();
            
        })

        showActionSheetWithOptions
    }

    return (
        <View style={S.styles.header}>
            <View style={S.styles.profile}>
                <Image style={S.styles.profileImage} />
                <View style={S.styles.profileText}>
                    <Text style={S.styles.profileName}>김소현</Text>
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