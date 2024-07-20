import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
    favoriteImage: {
        width: 30,
        height: 30,
    },
    favoriteButton: {
        flex: 1,
    },
    actionButtons: {
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
});
