import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 10,
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
    },
    tabText: {
        fontSize: 16,
    },
    activeTabText: {
        fontWeight: 'bold',
        color: 'gray',
    },
    row: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    characterContainer: {
        width: '30%',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: '#f0f0f0',
        marginHorizontal: '1.5%',
        position: 'relative',
    },
    selectedCharacter: {
        borderColor: '#00f',
        borderWidth: 2,
    },
    image: {
        width: 50,
        height: 50,
        marginVertical: 10,
    },
    text: {
        marginVertical: 5,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    artworkTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
    },
    checkmark: {
        position: 'absolute',
        top: 5,
        right: 5,
        fontSize: 20,
        color: '#00f',
    },
    flatListContent: {
        flexGrow: 1,
        alignItems: 'flex-start',
    }
});
