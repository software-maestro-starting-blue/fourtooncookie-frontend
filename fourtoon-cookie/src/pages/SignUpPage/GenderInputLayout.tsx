import { Image, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import { Gender } from "../../types/gender";
import MALE_ICON from "../../../assets/icon/man.png";
import FEMALE_ICON from "../../../assets/icon/woman.png";
import Container from "./Container";
import { useTranslationWithParentName } from "../../hooks/locale";
import { useSignUpPageContext } from "./SignUpPageProvider";

const GenderInputLayout = () => {
    const { gender, setGender } = useSignUpPageContext();

    const t = useTranslationWithParentName('pages.signUpPage.genderInputLayout');

    return (
        <Container title={t("title")} >
            {[Gender.MALE, Gender.FEMALE].map(genderItem => 
                <View key={genderItem} >
                    <GenderComponent
                        gender={genderItem}
                        isSelected={gender == genderItem}
                        onPress={() => setGender(genderItem)}
                    />
                </View>
            )}
        </Container>
    );
}

interface GenderComponentProps {
    gender: Gender;
    isSelected: boolean;
    onPress: () => void;
}

const GenderComponent = (props: GenderComponentProps) => {
    const { gender, isSelected, onPress, ...rest } = props;

    return (
        <TouchableOpacity 
            style={[styles.genderOption, isSelected && styles.selectedOption]}
            onPress={onPress}
        >
            <Image 
                style={styles.genderImage}
                source={(gender == Gender.MALE) ? MALE_ICON : FEMALE_ICON}
            />
            <Text style={styles.genderText}>{gender}</Text>
        </TouchableOpacity>
    )

}

export default GenderInputLayout;

const styles = StyleSheet.create({
    genderOption: {
      marginTop: '60%',
      width: 147,
      height: 138,
      padding: 10,
      borderColor: '#EEEEEE',
      borderWidth: 1,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    selectedOption: {
      borderColor: '#FFC426',
    },
    genderImage: {
      width: 60,
      height: 60,
      marginBottom: 10,
    },
    genderText: {
      fontSize: 17,
      fontWeight: '600',
      color: '#212121',
      marginTop: 10,
    },
  });