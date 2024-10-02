import { FallbackProps } from "react-error-boundary";
import { Text, TouchableOpacity, View } from "react-native";


const ErrorComponent = (props: FallbackProps) => {
    const { error, resetErrorBoundary } = props;

    return (
        <TouchableOpacity onPress={() => resetErrorBoundary()}>
            <View>
                <Text>
                    에러가 발생했습니다.
                </Text>
            </View>
        </TouchableOpacity>
    );
}

export default ErrorComponent;