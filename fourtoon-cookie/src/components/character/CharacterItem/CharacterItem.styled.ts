import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    characterContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 8,
        margin: 3,
        width: 110,
        height: 138,
    },
    imageContainer: {
        width: "100%",
        height: 110,
        overflow: 'hidden',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 55,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.03)',
    },
    name: {
        width: "100%",
        height: 20,
        fontFamily: 'Pretendard',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'center',
        letterSpacing: -0.005,
        color: '#212121',
    },
    checkmarkWrapper: {
        position: 'absolute',
        width: 36,
        height: 36,
        left: 74,
        top: 74,
        backgroundColor: '#FFC426',
        borderColor: '#FFFFFF',
        borderWidth: 2,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
      },
      checkmark: {
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
      },
      checkmarkText: {
        color: '#000000',
        fontSize: 18,
      },
});
