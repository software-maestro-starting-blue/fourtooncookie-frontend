import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    character: {
        flexDirection: 'row'
    },
    characterCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#000',
        borderWidth: 1,
        marginRight: 16,
    },
    characterText: {
        fontSize: 14,
    },
    changeButton: {
        flex: 4,
        backgroundColor: '#ddd',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        justifyContent: 'center',
    },
    changeButtonText: {
        fontSize: 16,
        textAlign: 'center',
    },
});