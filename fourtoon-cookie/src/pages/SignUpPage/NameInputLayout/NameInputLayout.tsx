import { View, Text, TextInput, StyleProp, TextStyle, ViewStyle } from "react-native";
import * as S from "./NameInputLayout.styled";

export interface NameInputLayoutProps {
    name: string;
    onNameChange: (name: string) => void;
}

const NameInputLayout = (props: NameInputLayoutProps) => {
    const { name, onNameChange } = props;

    return (
        <View>
            <Text style={S.styles.title}>당신의 이름을 알려주세요</Text>
            <View style={S.styles.inputContainer}>
                <TextInput
                    style={S.styles.input}
                    placeholder="이름을 입력해주세요"
                    placeholderTextColor="#CCCCCC"
                    value={name}
                    onChangeText={onNameChange}
                />
            </View>
        </View>
    )

}

export default NameInputLayout;