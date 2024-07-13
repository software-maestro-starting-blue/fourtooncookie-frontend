import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    imageLayout: {
        width: '48%',
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: 100,
        backgroundColor: '#f0f0f0',
        resizeMode: 'cover',
    }
});
