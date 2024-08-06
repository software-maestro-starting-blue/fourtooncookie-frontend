import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
        paddingLeft: 20,
        gap: 8
    },
    headerImageLogo: {
        position: 'relative',
        width: 28,
        height: 28,
        resizeMode: 'contain',
    },
    headerTextLogo: {
        position: 'relative',
        width: 210,
        height: 23,
        resizeMode: 'contain',
    },
});
