import { FallbackProps } from "react-error-boundary";
import { Text, TouchableOpacity, View } from "react-native";

import * as S from "./ErrorComponent.styled";
import { SafeAreaView } from "react-native-safe-area-context";

const ErrorComponent = (props: FallbackProps) => {
    const { error, resetErrorBoundary } = props;

    return (
        <SafeAreaView style={S.styles.area}>
            <TouchableOpacity onPress={() => resetErrorBoundary()}>
                <View>
                    <Text>
                        에러가 발생했습니다. 화면을 클릭하여 다시 시도해주세요.
                    </Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default ErrorComponent;