import { LocalDate } from "@js-joda/core";
import { Character } from "../../../../types/character";
import * as S from "./Header.styled";
import { Image, Text, TouchableOpacity, View } from "react-native";
import DOTS_ICON from "../../../../../assets/icon/dots.png";

export interface HeaderProps {
    characterId: number;
    date: LocalDate;
    onEdit: () => void;
    onDelete: () => void;
}

const Header = (props: HeaderProps) => {
    const { characterId, date, onEdit, onDelete } = props;

    return (
        <View style={S.styles.header}>
            <View style={S.styles.profile}>
                <Image style={S.styles.profileImage} />
                <View style={S.styles.profileText}>
                    <Text style={S.styles.profileName}>김소현</Text>
                    <Text style={S.styles.profileDate}>{date.toString()}</Text>
                </View>
            </View>
            <TouchableOpacity style={S.styles.moreIcon}>
                <Image source={DOTS_ICON} style={S.styles.moreShape} />
            </TouchableOpacity>
        </View>
    );
}

export default Header;