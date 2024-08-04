import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    progressContainer: {
      width: '100%',
      alignItems: 'flex-end',
      marginTop: 20,
    },
    progressText: {
      fontSize: 17,
      fontStyle: 'normal',
      fontWeight: 600,
      color: '#212121',
    },
    progressTextGray: {
      fontSize: 17,
      fontStyle: 'normal',
      fontWeight: 600,
      color: '#DDDDDD',
    },
    progressBarBackground: {
      width: '100%',
      height: 8,
      backgroundColor: '#F7F7F7',
      borderRadius: 4,
      marginTop: 8,
      position: 'relative',
    },
    progressBarForeground: {
      height: 8,
      backgroundColor: '#212121',
      borderRadius: 4,
      position: 'absolute',
    },
  });