import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native"
import { OS } from "../../types/os";


export interface KeyboardAwareContainerProps {
    children?: React.ReactNode;
}

const KeyboardAwareContainer = (props: KeyboardAwareContainerProps) => {
    const { children, ...rest } = props;

    return (
        <KeyboardAvoidingView 
            style={styles.bottomContainer} 
            enabled={true}
            keyboardVerticalOffset={80}
            behavior={(Platform.OS == OS.IOS) ? 'padding' : 'height'}
        >
            {children}
        </KeyboardAvoidingView>
    );
}

export default KeyboardAwareContainer;

const styles = StyleSheet.create({
    bottomContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
});