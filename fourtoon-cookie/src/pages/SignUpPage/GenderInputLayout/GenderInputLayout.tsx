import { Image, StyleProp, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import { Gender } from "../../../types/gender";
import * as S from "./GenderInputLayout.styled"

export interface GenderInputLayoutProps {
    gender: Gender | null;
    onGenderChange: (gender: Gender) => void;
}

const GenderInputLayout = (props: GenderInputLayoutProps) => {
    const { gender, onGenderChange } = props;

    return [Gender.MALE, Gender.FEMALE].map(genderItem => 
            <View key={genderItem} >
                <GenderComponent
                    gender={genderItem}
                    isSelected={gender == genderItem}
                    onPress={() => onGenderChange(genderItem)}
                />
            </View>
        );
}

interface GenderComponentProps {
    gender: Gender;
    isSelected: boolean;
    onPress: () => void;
}

const GenderComponent = (props: GenderComponentProps) => {
    const { gender, isSelected, onPress } = props;

    return (
        <TouchableOpacity 
            style={[S.styles.genderOption, isSelected && S.styles.selectedOption]}
            onPress={onPress}
        >
            <Image style={S.styles.genderImage}/>
            <Text style={S.styles.genderText}>{gender}</Text>
        </TouchableOpacity>
    )

}

export default GenderInputLayout;