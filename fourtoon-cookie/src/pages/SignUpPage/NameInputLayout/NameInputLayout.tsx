import { View, Text, TextInput, StyleProp, TextStyle, ViewStyle } from "react-native";
import * as S from "./NameInputLayout.styled";

export interface NameInputLayoutProps {
    name: string;
    titleStyle: StyleProp<TextStyle>;
    containerStyle: StyleProp<ViewStyle>;
    onNameChange: (name: string) => void;
}

const NameInputLayout = (props: NameInputLayoutProps) => {
    const { name, titleStyle, containerStyle, onNameChange } = props;

    return (
        <View>
            <Text style={titleStyle}>당신의 이름을 알려주세요</Text>
            <View style={containerStyle}>
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