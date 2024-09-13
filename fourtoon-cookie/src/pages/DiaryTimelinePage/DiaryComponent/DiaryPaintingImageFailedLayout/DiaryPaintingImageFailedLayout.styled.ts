import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    emptyContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    characterIcon: {
        width: 60,
        height: 60,
        marginBottom: 10,
    },
    characterText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    estimatedTimeText: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
    },
});
