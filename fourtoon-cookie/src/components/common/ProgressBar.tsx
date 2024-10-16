
import { Animated, StyleSheet, Text, View } from "react-native";
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
        <View style={styles.progressContainer}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.progressText}>{progress}</Text>
                <Text style={styles.progressTextGray}> / {totalProgress}</Text>
            </View>
            <View style={[styles.progressBarBackground]}>
                <Animated.View style={[styles.progressBarForeground, { width: progressWidth.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%']
                }) }]} />
            </View>
        </View>
    );
}

export default ProgressBar;

const styles = StyleSheet.create({
    progressContainer: {
      width: '100%',
      alignItems: 'flex-end',
      marginTop: 20,
    },
    progressText: {
      fontSize: 17,
      fontStyle: 'normal',
      fontWeight: '600',
      color: '#212121',
    },
    progressTextGray: {
      fontSize: 17,
      fontStyle: 'normal',
      fontWeight: '600',
      color: '#DDDDDD',
    },
    progressBarBackground: {
      width: '100%',
      height: 8,
      backgroundColor: '#F7F7F7',
      borderRadius: 4,
      marginTop: 8,
      position: 'relative',
    },
    progressBarForeground: {
      height: 8,
      backgroundColor: '#212121',
      borderRadius: 4,
      position: 'absolute',
    },
  });