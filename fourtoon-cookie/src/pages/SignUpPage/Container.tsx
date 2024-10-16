import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

interface ContainerProps {
    title: string;
    children: ReactNode;
}

const Container = (props: ContainerProps) => {
    const { title, children, ...rest } = props;

    return (
        <View>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.inputContainer}>
                {children}
            </View>
        </View>
    );
}

export default Container;

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#212121'
      },
      inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 50,
        marginBottom: 20,
      },
})