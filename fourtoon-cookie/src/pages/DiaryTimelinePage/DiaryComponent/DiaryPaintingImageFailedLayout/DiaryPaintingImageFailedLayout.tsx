import { Image, Text, View } from "react-native";
import X_ICON from "../../../../../assets/icon/x.png";

import * as S from "./DiaryPaintingImageFailedLayout.styled";
import { useTranslationWithParentName } from "../../../../hooks/locale";


const DiaryPaintingImageFailedLayout = () => {

    const t = useTranslationWithParentName("diaryTimelinePage.diaryComponent.diaryPaintingImageFailedLayout");

    return (
        <View style={S.styles.emptyContainer}>
            <Image 
                source={X_ICON}
                style={S.styles.characterIcon}
            />
            <Text style={S.styles.characterText}>
                {t("title")}
            </Text>
            <Text style={S.styles.estimatedTimeText}>{t("detail")}</Text>
        </View>
    );
}

export default DiaryPaintingImageFailedLayout;