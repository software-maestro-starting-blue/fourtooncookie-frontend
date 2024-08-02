import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    statusBar: {
      position: 'absolute',
      width: '100%',
      height: 47,
      top: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    time: {
      fontWeight: '600',
      fontSize: 17,
      color: '#000000',
    },
    logoContainer: {
      position: 'absolute',
      width: 120,
      height: 120,
      top: 211.5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      width: '100%',
      height: '100%',
    },
    description: {
      position: 'absolute',
      top: 345,
      textAlign: 'center',
      fontWeight: '500',
      fontSize: 14,
      color: '#AAAAAA',
    },
    buttons: {
      position: 'absolute',
      width: 350,
      height: 136,
      top: 654,
      justifyContent: 'space-between',
    },
    buttonGoogle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 19,
      backgroundColor: '#F7F7F7',
      borderRadius: 16,
    },
    buttonTextGoogle: {
      fontWeight: '600',
      fontSize: 17,
      color: '#242424',
    },
    googleLogo: {
      width: 24,
      height: 24,
      position: 'absolute',
      left: 18,
    },
    buttonApple: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 19,
      backgroundColor: '#000000',
      borderRadius: 16,
    },
    buttonTextApple: {
      fontWeight: '600',
      fontSize: 17,
      color: '#FFFFFF',
    },
    appleLogo: {
      width: 17.29,
      height: 21.26,
      position: 'absolute',
      left: 18,
    },
  });