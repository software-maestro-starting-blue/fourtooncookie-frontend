import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: "100%",
        aspectRatio: 1,
        borderRadius: 20,
    },
    imageContainer: {
        width: "49%",
        height: "49%",
        alignItems: 'center',
        marginBottom: 10,
    },
    image: {
        flex: 1,
        width: "100%",
        height: "100%",
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
