import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      textAlign: 'center',
      marginVertical: 16,
    },
    body: {
        flex: 1
    },
    section: {
        marginTop: 20,
        marginVertical: 8,
    },
    sectionTitle: {
      fontSize: 18,
      marginBottom: 8,
    },
    character: {
        flexDirection: 'row'
    },
    box: {
      backgroundColor: '#f0f0f0',
      borderRadius: 8,
      padding: 16,
    },
    infoText: {
      fontSize: 16,
    },
    characterCircle: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#000',
      borderWidth: 1,
      marginRight: 16,
    },
    characterText: {
      fontSize: 14,
    },
    changeButton: {
        flex: 4,
        backgroundColor: '#ddd',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        justifyContent: 'center',
    },
    changeButtonText: {
      fontSize: 16,
      textAlign: 'center',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 16,
    },
    inquiryText: {
      fontSize: 16,
      color: '#aaa',
      textDecorationLine: 'underline',
      textDecorationColor: '#ddd',
    },
    logoutText: {
      fontSize: 16,
      color: 'red',
      textDecorationLine: 'underline',
      textDecorationColor: 'red',
    },
  });
  