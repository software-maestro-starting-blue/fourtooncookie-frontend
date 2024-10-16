import { StyleSheet, TextInput, View } from "react-native";

import { useTranslationWithParentName } from "../../hooks/locale";

export interface TextInputLayoutProps {
    text: string,
    onTextChange: (value: string) => void,
}

const TextInputLayout = (props: TextInputLayoutProps) => {
    const { text, onTextChange, ...rest } = props;

    const t = useTranslationWithParentName("pages.diaryWritePage.textInputLayout");
    
    return (
        <View style={styles.content}>
            <TextInput
                style={styles.diaryInput}
                placeholder={t("placeholder")}
                placeholderTextColor="#CCCCCC"
                value={text}
                multiline={true}
                scrollEnabled={true}
                onChangeText={onTextChange}
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