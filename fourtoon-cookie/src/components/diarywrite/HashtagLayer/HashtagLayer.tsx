import { Text, View } from "react-native";
import * as S from "./HashtagLayer.styled";
import Hashtag from "./components/Hashtag/Hashtag";

export interface HashtagLayerProps {
    hashtagIds: number[]
}

const HashtagLayer = (props: HashtagLayerProps) => {
    const {hashtagIds, ...rest} = props;

    return (
        <View style={[S.styles.tags]}>
            {hashtagIds.map((id) => (
                <Hashtag key={id} hashtagId={id} />
            ))}
        </View>
    );
}

export default HashtagLayer;