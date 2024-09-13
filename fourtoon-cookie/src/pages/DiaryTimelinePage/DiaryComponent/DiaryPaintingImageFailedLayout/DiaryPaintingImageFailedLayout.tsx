import { Image, Text, View } from "react-native";
import X_ICON from "../../../../../assets/icon/x.png";

import * as S from "./DiaryPaintingImageFailedLayout.styled";


const DiaryPaintingImageFailedLayout = () => {

    return (
        <View style={S.styles.emptyContainer}>
            <Image 
                source={X_ICON}
                style={S.styles.characterIcon}
            />
            <Text style={S.styles.characterText}>
                그림 생성에 실패했습니다.
            </Text>
            <Text style={S.styles.estimatedTimeText}>내용이 추상적이거나, 비윤리적인 등의 문제가 있는 것 같습니다. 삭제 후 다시 시도해주세요.</Text>
        </View>
    );
}

export default DiaryPaintingImageFailedLayout;