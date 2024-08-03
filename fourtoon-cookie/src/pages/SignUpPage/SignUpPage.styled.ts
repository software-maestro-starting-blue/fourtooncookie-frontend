import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 0,
      backgroundColor: '#FFFFFF'
    },
    contentContainer: {
      flex: 1,
      width: '100%',
      paddingHorizontal: 20,
    },
    separator: {
      height: 1,
      backgroundColor: '#DDDDDD',
      marginVertical: 10,
    },
    footer: {
      width: '100%',
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    nextButton: {
      width: '100%',
      height: 60,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
    },
    nextButtonText: {
      fontSize: 17,
      fontWeight: '700',
      color: '#FFFFFF',
    }
});