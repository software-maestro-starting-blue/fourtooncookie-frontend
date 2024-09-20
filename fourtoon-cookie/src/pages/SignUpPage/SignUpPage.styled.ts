import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    container: {
      flex: 1,
      padding: 23,
      position: 'relative'
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: '#212121'
    },
    inputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 50,
      marginBottom: 20,
    },
    bottomContainer: {
      position: 'absolute',
      bottom: 20,
      left: 20,
      right: 20,
    },
    progressContainer: {
      marginBottom: 20,
    },
    nextButton: {
      width: '100%',
      height: 60,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    nextButtonText: {
      fontSize: 17,
      fontWeight: '600'
    }
});