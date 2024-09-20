
import { Animated, Text, View } from "react-native";
import * as S from "./ProgressBar.styled"
import { useEffect, useRef } from "react";

export interface ProgressBarProps {
    progress: number;
    totalProgress: number;
    isAnimated: boolean;
}

const ProgressBar = (props: ProgressBarProps) => {
    const { progress, totalProgress, isAnimated, ...rest } = props;

    const progressWidth = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isAnimated) {
            Animated.timing(progressWidth, {
                toValue: progress / totalProgress * 100,
                duration: 500,
                useNativeDriver: false,
            }).start();
        } else {
            progressWidth.setValue(progress / totalProgress * 100);
        }
    }, [progress, totalProgress, isAnimated]);

    return (
        <View style={S.styles.progressContainer}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={S.styles.progressText}>{progress}</Text>
                <Text style={S.styles.progressTextGray}> / {totalProgress}</Text>
            </View>
            <View style={[S.styles.progressBarBackground]}>
                <Animated.View style={[S.styles.progressBarForeground, { width: progressWidth.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%']
                }) }]} />
            </View>
        </View>
    );
}

export default ProgressBar;