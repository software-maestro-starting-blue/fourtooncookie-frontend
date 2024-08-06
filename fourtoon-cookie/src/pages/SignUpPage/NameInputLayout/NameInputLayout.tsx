import { TextInput } from "react-native";
import * as S from "./NameInputLayout.styled";

export interface NameInputLayoutProps {
    name: string;
    onNameChange: (name: string) => void;
}

const NameInputLayout = (props: NameInputLayoutProps) => {
    const { name, onNameChange, ...rest } = props;

    return (
        <TextInput
            style={S.styles.input}
            placeholder="이름을 입력해주세요"
            placeholderTextColor="#CCCCCC"
            value={name}
            onChangeText={onNameChange}
        />
    )

}

export default NameInputLayout;