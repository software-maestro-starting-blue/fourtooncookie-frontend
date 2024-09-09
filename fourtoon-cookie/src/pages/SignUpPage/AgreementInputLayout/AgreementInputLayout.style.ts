import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    agreementContainer: {

        alignItems: 'center',
    },
    textWithCheckboxContainer: {
        flexDirection: 'row', // 텍스트와 체크박스를 한 줄에 배치
        alignItems: 'center', // 체크박스를 텍스트와 수평 정렬
    },
    agreementText: {
        fontSize: 16,
        marginRight: 10, // 체크박스와 텍스트 사이의 여백
    },
    linkText: {
        color: '#1E90FF', // 링크 색상
        textDecorationLine: 'underline', // 링크 밑줄
    },
    checkbox: {
        marginLeft: 8, // 텍스트와 체크박스 사이에 약간의 여백 추가
    },
    checkboxText: {
        fontSize: 16,
    },
});
