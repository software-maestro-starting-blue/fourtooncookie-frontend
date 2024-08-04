import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    grid: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 2,
        width: 318,
        height: 318,
        borderRadius: 20,
    },
    image: {
        width: 158,
        height: 158,
        marginBottom: 10,
        resizeMode: 'contain',
    },
    
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
    },
    modalImage: {
        width: '100%',
        height: 'auto',
        aspectRatio: 1,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 15,
        padding: 5,
        zIndex: 10,
    },
    closeButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
});
