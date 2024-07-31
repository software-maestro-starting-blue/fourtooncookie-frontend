import { View } from "react-native";
import Hashtag from "./Hashtag/Hashtag";

import * as S from "./HashtagLayout.styled";

export interface HashtagLayoutProps {
    hashtagIds: number[]
}

const HashtagLayout = (props: HashtagLayoutProps) => {
    const {hashtagIds, ...rest} = props;


    return (
        <View style={[S.styles.tags]}>
            {hashtagIds.map((id) => (
                <Hashtag key={id} hashtagId={id} />
            ))}
        </View>
    );
}

export default HashtagLayout;