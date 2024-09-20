import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    headersContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    tab: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 18,
        marginRight: 8,
    },
    selectedTab: {
        backgroundColor: '#212121',
    },
    tabText: {
        fontFamily: 'Pretendard',
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 20,
        letterSpacing: -0.005,
        color: '#AAAAAA',
    },
    activeTabText: {
        fontFamily: 'Pretendard',
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 20,
        letterSpacing: -0.005,
        color: '#FFFFFF',
    }
});