import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 16,
        marginLeft: 10,
        marginRight: 10,
        gap: 16,
        width: 'auto',
        height: 'auto',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
    },
    contents: {
        flexDirection: 'column',
        marginBottom: 10,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    likeImage: {
        width: 30,
        height: 30,
    },
    footerLikeButton: {
        flex: 1,
    },
    settingButtons: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    button: {
        padding: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: 'gray',
        textAlign: 'center',
        marginLeft: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});
