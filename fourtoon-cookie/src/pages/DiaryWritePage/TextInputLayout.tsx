import { StyleSheet, TextInput, View } from "react-native";

import { useTranslationWithParentName } from "../../hooks/locale";
import { useDiaryWritePageContext } from "./DiaryWritePageProvider";

const TextInputLayout = () => {
    const { content, setContent } = useDiaryWritePageContext();

    const t = useTranslationWithParentName("pages.diaryWritePage.textInputLayout");
    
    return (
        <View style={styles.content}>
            <TextInput
                style={styles.diaryInput}
                placeholder={t("placeholder")}
                placeholderTextColor="#CCCCCC"
                value={content}
                multiline={true}
                scrollEnabled={true}
                onChangeText={setContent}
            />
        </View>
    );
}

export default TextInputLayout;

const styles = StyleSheet.create({
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '30%'
      },
      diaryInput: {
        width: '100%',
        height: '100%',
        textAlignVertical: 'top',
        fontWeight: '400',
        fontSize: 20,
        lineHeight: 32,
        fontFamily: 'Pretendard',
        color: "#212121",
        padding: 10,
      },
});