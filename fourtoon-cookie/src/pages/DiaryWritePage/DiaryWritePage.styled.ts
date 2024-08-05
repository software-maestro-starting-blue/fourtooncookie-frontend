import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        flex: 1,
        paddingLeft: 23,
        paddingRight: 23,
        position: 'relative'
      },
    rectangle: {
        width: 350,
        height: 1,
        backgroundColor: '#F7F7F7',
        alignSelf: 'stretch',
        flexGrow: 0,
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
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