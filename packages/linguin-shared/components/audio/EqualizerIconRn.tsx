import { useEffect, useRef } from 'react';
import { Div } from "linguin-shared/components/RnTwComponents";
import { Platform, Animated } from 'react-native';

interface EqualizerIconWebProps {
    isAnimated: boolean;
    onClick: () => void;
}

export default function EqualizerIconWeb(props: EqualizerIconWebProps) {
    // Styles for the equalizer bars

    return (
        <Div style={{ display: 'flex', flexDirection: 'row', justifyItems: 'center', height: "100%", alignItems: 'center' }}
            onClick={props.onClick}>
            <AnimatedBar isAnimated={props.isAnimated} duration={400} delay={430} defaultHeight={6} />
            <AnimatedBar isAnimated={props.isAnimated} duration={400} delay={250} defaultHeight={13} />
            <AnimatedBar isAnimated={props.isAnimated} duration={400} delay={0} defaultHeight={20} />
        </Div>
    );
};

interface AnimatedBarProps {
    isAnimated: boolean;
    duration: number;
    delay: number;
    defaultHeight: number;
}

function AnimatedBar(props: AnimatedBarProps) {
    const sizeAnim = useRef(new Animated.Value(20)).current;
    var animation;

    useEffect(() => {
        animation = Animated.sequence([
            Animated.delay(props.delay),
            Animated.loop(
                Animated.sequence([
                    Animated.timing(sizeAnim, {
                        toValue: 5,
                        duration: props.duration,
                        useNativeDriver: false
                    }),
                    Animated.timing(sizeAnim, {
                        toValue: 20,
                        duration: props.duration,
                        useNativeDriver: false
                    })
                ]),
            )]).start()
    }, []);

    return (
        <Animated.View style={{
            width: 5,
            height: props.isAnimated ? sizeAnim : props.defaultHeight, // Assign different heights when not animated
            backgroundColor: '#0891b2',
            margin: 1,
            marginTop: props.isAnimated ? sizeAnim.interpolate({
                inputRange: [6, 20],
                outputRange: [10, 3]
            }) : 0,
        }} />
    );
}
