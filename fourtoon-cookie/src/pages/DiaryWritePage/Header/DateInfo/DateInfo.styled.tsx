import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    view: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    date: {
        fontFamily: 'Pretendard',
        fontWeight: '600',
        fontSize: 17,
        lineHeight: 24,
        display: 'flex',
        alignItems: 'center',
        letterSpacing: -0.5,
        color: '#212121',
    },
    downArrow: {
        width: 24,
        height: 24,
        marginLeft: 10,
    },
    dateModal: {
        position: "absolute"
    }
});