import { FallbackProps } from "react-error-boundary";
import { Text, TouchableOpacity, View } from "react-native";

import * as S from "./ErrorComponent.styled";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslationWithParentName } from "../../../hooks/locale";

const ErrorComponent = (props: FallbackProps) => {
    const { error, resetErrorBoundary } = props;

    const t = useTranslationWithParentName('components.errorComponent');

    return (
        <SafeAreaView style={S.styles.safeArea}>
            <TouchableOpacity onPress={() => resetErrorBoundary()}>
                <View>
                    <Text>
                        {t("errorRetry")}
                    </Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default ErrorComponent;