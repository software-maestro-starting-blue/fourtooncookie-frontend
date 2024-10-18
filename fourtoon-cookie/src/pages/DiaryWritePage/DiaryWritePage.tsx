import { SafeAreaView, StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import TextInputLayout from "./TextInputLayout";

import { RootStackParamList } from "../../types/routing";

import WriteDoneButtonLayout from "./WriteDoneButtonLayout";
import BackButton from "../../components/common/BackButton";
import DateInfo from "./DateInfo";
import CharacterIconButton from "./CharacterIconButton";
import DiaryWritePageProvider from "./DiaryWritePageProvider";



const DiaryWritePageContent = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <BackButton style={styles.backButton}/>
                    <DateInfo/>
                    <CharacterIconButton/>
                </View>
                <TextInputLayout/>
                <View style={styles.separator} />
                <WriteDoneButtonLayout/>
            </View>
        </SafeAreaView>
    );
}

export type DiaryWritePageProp = NativeStackScreenProps<RootStackParamList, 'DiaryWritePage'>;

const DiaryWritePage = ({ route }: DiaryWritePageProp) => {
    const { currentDiaryId, ...rest } = route.params || { currentDiaryId : undefined };

    return (
        <DiaryWritePageProvider currentDiaryId={currentDiaryId} >
            <DiaryWritePageContent />
        </DiaryWritePageProvider>
    );
}

export default DiaryWritePage;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        flex: 1,
        paddingLeft: 23,
        paddingRight: 23,
        position: 'relative'
      },
    separator: {
        width: "100%",
        height: 1,
        backgroundColor: '#E9ECEF',
        alignSelf: 'stretch',
        flexGrow: 0,
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
      },
    nextButton: {
        width: '100%',
        height: 60,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
      },
      nextButtonText: {
        fontSize: 17,
        fontWeight: '600'
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        width: '100%',
        height: 64,
      },
      backButton: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        position: 'relative'
      }
});