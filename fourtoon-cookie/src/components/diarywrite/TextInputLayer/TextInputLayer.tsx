import { TextInput, View } from "react-native";

import * as S from "./TextInputLayer.styled";

export interface TextInputLayerProps {
    text: string,
    onTextChange: (value: string) => void,
}

const TextInputLayer = (props: TextInputLayerProps) => {
    const { text, onTextChange, ...rest } = props;
    
    return (
        <View style={S.styles.content}>
            <TextInput
                style={S.styles.diaryInput}
                multiline={true}
                placeholder=""
                value={text}
                onChangeText={onTextChange}
            />
        </View>
    );
}

export default TextInputLayer;