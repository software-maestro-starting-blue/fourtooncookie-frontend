import { TextInput, View } from "react-native";

import * as S from "./TextInputLayout.styled";

export interface TextInputLayoutProps {
    text: string,
    onTextChange: (value: string) => void,
}

const TextInputLayout = (props: TextInputLayoutProps) => {
    const { text, onTextChange, ...rest } = props;
    
    return (
        <View style={S.styles.content}>
            <TextInput
                style={S.styles.diaryInput}
                placeholder="일기를 작성하세요"
                value={text}
                multiline={true}
                scrollEnabled={false}
                onChangeText={onTextChange}
            />
        </View>
    );
}

export default TextInputLayout;