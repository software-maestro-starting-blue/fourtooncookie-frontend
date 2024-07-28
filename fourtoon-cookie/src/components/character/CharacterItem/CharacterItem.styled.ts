import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    characterContainer: {
        width: '30%',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: '#f0f0f0',
        marginHorizontal: '1.5%',
        position: 'relative',
    },
    selectedCharacter: {
        borderColor: '#00f',
        borderWidth: 2,
    },
    image: {
        width: 50,
        height: 50,
        marginVertical: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    checkmark: {
        position: 'absolute',
        top: 5,
        right: 5,
        fontSize: 20,
        color: '#00f',
    },
});
