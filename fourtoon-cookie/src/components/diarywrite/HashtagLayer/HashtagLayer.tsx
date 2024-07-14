import { Text, View } from "react-native";
import * as S from "./HashtagLayer.styled";
import Hashtag from "./components/Hashtag/Hashtag";

export interface HashtagLayerProps {
    hashtagIds: number[]
}

const HashtagLayer = (props: HashtagLayerProps) => {
    const {hashtagIds, ...rest} = props;

    // TODO: hashtag 이미지들 나열시키기
    return (
        <View style={S.styles.tags}>
            {hashtagIds.map((id) => (
                <Hashtag key={id} hashtagId={id} />
            ))}
        </View>
    );
}

export default HashtagLayer;