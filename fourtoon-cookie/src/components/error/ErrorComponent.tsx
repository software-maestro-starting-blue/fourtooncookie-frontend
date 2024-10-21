import { FallbackProps } from "react-error-boundary";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useTranslationWithParentName } from "../../hooks/locale";

import SORRY_ICON from '../../../assets/icon/sorry.png';

const ErrorComponent = (props: FallbackProps) => {
    const { error, resetErrorBoundary } = props;

    const t = useTranslationWithParentName('components.errorComponent');

    return (
        <TouchableOpacity onPress={resetErrorBoundary} style={styles.container}>
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Image source={SORRY_ICON} style={styles.logo} />
                </View>
                <Text style={styles.subtitle}>{t("errorRetry")}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default ErrorComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
      },
      header: {
        flex: 0.9,
        justifyContent: 'center',
        alignItems: 'center',
      },
      logoContainer: {
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
      },
      logo: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
      },
      subtitle: {
        fontFamily: 'Pretendard',
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 20,
        color: 'black',
        marginTop: 8,
      },
      buttonsContainer: {
        position: 'absolute',
        bottom: 60,
        left: 20,
        right: 20,
      },
});