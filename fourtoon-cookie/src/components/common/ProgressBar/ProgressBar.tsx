
import { Animated, Text, View } from "react-native";
import * as S from "./ProgressBar.styled"
import { useEffect, useRef } from "react";

export interface ProgressBarProps {
    progress: number;
    totalProgress: number;
    barWidth: number;
    isAnimated: boolean;
}

const ProgressBar = (props: ProgressBarProps) => {
    const { progress, totalProgress, barWidth, isAnimated } = props;

    const progressWidth = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isAnimated) {
            Animated.timing(progressWidth, {
                toValue: progress / totalProgress * barWidth,
                duration: 500,
                useNativeDriver: false,
            }).start();
        } else {
            progressWidth.setValue(progress / totalProgress * barWidth);
        }
    }, [progress, totalProgress, barWidth, isAnimated]);

    return (
        <View style={S.styles.progressContainer}>
            <Text style={S.styles.progressText}>{progress} / {totalProgress}</Text>
            <View style={[S.styles.progressBarBackground, {width: barWidth}]}>
                <Animated.View style={[S.styles.progressBarForeground, { width: progressWidth }]} />
            </View>
        </View>
    );
}

export default ProgressBar;