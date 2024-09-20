import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    profileContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
        width: "100%",
        height: "auto",
        marginBottom: 40,
      },
      profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.03)',
      },    
      name: {
        fontFamily: 'Pretendard',
        fontWeight: '700',
        fontSize: 28,
        lineHeight: 32,
        textAlign: 'center',
        letterSpacing: -0.005,
        color: '#212121',
      },
      email: {
        fontFamily: 'Pretendard',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 20,
        textAlign: 'center',
        letterSpacing: -0.005,
        color: '#999999',
      },
      changeCharacterButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#212121',
        borderRadius: 20,
        width: 96,
        height: 40,
      },
      changeCharacterText: {
        fontFamily: 'Pretendard',
        fontWeight: '700',
        fontSize: 14,
        lineHeight: 16,
        color: '#FFFFFF',
      },
});