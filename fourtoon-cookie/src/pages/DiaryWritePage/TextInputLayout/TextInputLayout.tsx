import { TextInput, View } from "react-native";

import * as S from "./TextInputLayout.styled";
import { useTranslationWithParentName } from "../../../hooks/locale";

export interface TextInputLayoutProps {
    text: string,
    onTextChange: (value: string) => void,
}

const TextInputLayout = (props: TextInputLayoutProps) => {
    const { text, onTextChange, ...rest } = props;

    const t = useTranslationWithParentName("diaryWritePage.textInputLayout");
    
    return (
        <View style={S.styles.content}>
            <TextInput
                style={S.styles.diaryInput}
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