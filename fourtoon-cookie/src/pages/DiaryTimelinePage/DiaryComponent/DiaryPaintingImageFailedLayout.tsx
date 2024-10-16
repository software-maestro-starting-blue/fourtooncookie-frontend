import { Image, StyleSheet, Text, View } from "react-native";
import X_ICON from "../../../../assets/icon/x.png";

import { useTranslationWithParentName } from "../../../hooks/locale";


const DiaryPaintingImageFailedLayout = () => {

    const t = useTranslationWithParentName("pages.diaryTimelinePage.diaryComponent.diaryPaintingImageFailedLayout");

    return (
        <View style={styles.emptyContainer}>
            <Image 
                source={X_ICON}
                style={styles.characterIcon}
            />
            <Text style={styles.characterText}>
                {t("title")}
            </Text>
            <Text style={styles.estimatedTimeText}>{t("detail")}</Text>
        </View>
    );
}

export default DiaryPaintingImageFailedLayout;

const styles = StyleSheet.create({
    emptyContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    characterIcon: {
        width: 60,
        height: 60,
        marginBottom: 10,
    },
    characterText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    estimatedTimeText: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
    },
});
