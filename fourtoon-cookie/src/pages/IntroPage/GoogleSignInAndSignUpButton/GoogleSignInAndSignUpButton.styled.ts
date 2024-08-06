import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    googleButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 19,
        backgroundColor: '#F7F7F7',
        borderRadius: 16,
        marginBottom: 16,
      },
      googleLogo: {
        width: 24,
        height: 24,
        position: 'absolute',
        left: 18,
      },
      googleButtonText: {
        fontFamily: 'Pretendard',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 17,
        color: '#242424',
      },
})