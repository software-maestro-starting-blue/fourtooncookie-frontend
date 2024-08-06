import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        left: 0,
        right: 0,
        bottom: 0,
        padding: 0,
        width: "100%",
        height: "11%",
        backgroundColor: "#FFFFFF"
    },
    itemContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginBottom: 20,
        gap: 4,
        width: "33%",
        height: "100%",
    },
    icon: {
        width: 24,
        height: 24,
    },
    activeText: {
        width: 72,
        height: 12,
        fontFamily: 'Pretendard',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 10,
        lineHeight: 12,
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        color: '#212121',
    },
});