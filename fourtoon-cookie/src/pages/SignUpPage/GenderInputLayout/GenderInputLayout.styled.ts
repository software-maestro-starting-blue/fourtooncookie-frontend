import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    content: {
      flex: 1,
      width: '100%',
      marginTop: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: '#212121',
      marginBottom: 20,
    },
    genderContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    genderOption: {
      alignItems: 'center',
      padding: 20,
      borderWidth: 1,
      borderColor: '#CCCCCC',
      borderRadius: 16,
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
      fontSize: 18,
      fontWeight: '600',
      color: '#212121',
    },
  });