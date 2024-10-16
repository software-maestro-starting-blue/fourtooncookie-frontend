import { TextInput } from "react-native";
import * as S from "./NameInputLayout.styled";
import { useTranslationWithParentName } from "../../../hooks/locale";

export interface NameInputLayoutProps {
    name: string;
    onNameChange: (name: string) => void;
}

const NameInputLayout = (props: NameInputLayoutProps) => {
    const { name, onNameChange, ...rest } = props;

    const t = useTranslationWithParentName('pages.signUpPage.nameInputLayout');

    return (
        <TextInput
            style={S.styles.input}
            placeholder={t("placeholder")}
            placeholderTextColor="#CCCCCC"
            value={name}
            onChangeText={onNameChange}
        />
    )

}

export default NameInputLayout;