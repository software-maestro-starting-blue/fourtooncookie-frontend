import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
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
    image: {
        width: 40,
        height: 40,
        marginLeft: 10,
        marginRight: 10,
        resizeMode: 'contain',
    },
});
