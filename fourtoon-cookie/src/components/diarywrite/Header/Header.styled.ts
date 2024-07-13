import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 5,
        height: 60
    },
    leftContainer: {
      flexDirection: 'row', // 수평으로 배치
      alignItems: 'center', // 수직 가운데 정렬
    },
    rightContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
});