import { StyleSheet } from "react-native";
import * as S from "../SignUpPage.styled";


export const styles = StyleSheet.create({
    genderContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 50,
      marginBottom: 20,
    },
    genderOption: {
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
    ...S.styles,
  });