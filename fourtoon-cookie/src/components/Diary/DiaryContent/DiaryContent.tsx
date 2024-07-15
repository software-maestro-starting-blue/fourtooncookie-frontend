import React from "react";
import { View, Text } from "react-native";
import Button from "../../common/Button/Button";
import * as S from './DiaryContent.styled';

export interface DiaryContentProps {
    content: string;
}

const Date = (props: DiaryContentProps) => {
    const {content} = props;

    return (
        <View>
            <Text>{content}</Text>
            <Button title="더 보기" onPress={() => { console.log("더 보기 버튼") }} style={S.styles.more} textStyle={S.styles.moreText} />
        </View>
    );
};

export default Date;
