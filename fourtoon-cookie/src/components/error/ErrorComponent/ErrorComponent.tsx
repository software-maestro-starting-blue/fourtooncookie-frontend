import { FallbackProps } from "react-error-boundary";
import { Text, View } from "react-native";


const ErrorComponent = (props: FallbackProps) => {
    const { error, resetErrorBoundary } = props;

    return (
        <View>
            <Text>
                에러가 발생했습니다.
            </Text>
        </View>
    );
}

export default ErrorComponent;