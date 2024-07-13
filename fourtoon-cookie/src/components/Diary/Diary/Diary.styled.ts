import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        marginBottom: 10,
        padding: 10,
        width: '100%',
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
    more: {
        backgroundColor: 'white',
    },
    moreText: {
        color: 'gray',
    },
    date: {
        alignItems: 'flex-start',
    },
});
