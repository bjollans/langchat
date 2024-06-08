import { SingleLayerBtn } from 'linguin-shared/components/RnTwComponents';
import { useStoryAudioContext } from 'linguin-shared/context/storyAudioContext';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

interface ProgressBarProps {
    duration: number;
}

export default function ProgressBar(props: ProgressBarProps) {
    const [currentAudioTime, setCurrentAudioTime] = useState(0);
    const [isPlayingAudio, setIsPlayingAudio] = useState(false);
    const [rnProgressBarWidth, setRnProgressBarWidth] = useState(0);
    const [progressBarWidth, setProgressBarWidth] = useState<string | number>('0%');

    const {
        addIsPlayingAudioUpdateFunction,
        updateAudioTimes,
        addAudioTimeUpdateFunction
    } = useStoryAudioContext();

    useEffect(() => {
        var isPlayingAudioClojureState = isPlayingAudio;
        addIsPlayingAudioUpdateFunction((isPlayingAudio: boolean) => {
            isPlayingAudioClojureState = isPlayingAudio;
            setIsPlayingAudio(isPlayingAudioClojureState);
        });
        var currentAudioTimeClojureState = currentAudioTime;
        addAudioTimeUpdateFunction((audioTime: number) => {
            currentAudioTimeClojureState = audioTime;
            setCurrentAudioTime(currentAudioTimeClojureState);
        });
    }, []);

    const handleProgressBarClick = (e) => {
        if (Platform.OS === 'web') {
            const progressBar = e.currentTarget;
            const clickX = e.clientX - progressBar.getBoundingClientRect().left;
            const newTime = (clickX / progressBar.offsetWidth) * (props.duration || 0);
            updateAudioTimes(newTime);
        } else {
            const clickX = e.nativeEvent.locationX;
            const newTime = (clickX / rnProgressBarWidth) * props.duration;
            updateAudioTimes(newTime);
        }
    };

    useEffect(() => {
        const currentAudioPercentageTime = (currentAudioTime / props.duration);
        if (Platform.OS === 'web') {
            setProgressBarWidth(`${currentAudioPercentageTime * 100}%`);
        } else {
            setProgressBarWidth(Math.floor(currentAudioPercentageTime * rnProgressBarWidth) as number);
        }
    }, [currentAudioTime, props.duration]);

    return (
        <SingleLayerBtn
            style={{ height: 8, backgroundColor: '#e5e7eb', cursor: 'pointer', width: '100%', justifyContent: 'flex-start', display: 'flex' }}
            onClick={handleProgressBarClick}
            onLayout={(e) => setRnProgressBarWidth(e.nativeEvent.layout.width)}
        >
            <SingleLayerBtn
                style={{ backgroundColor: '#0891b2', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41, height: 8, width: progressBarWidth }}
                onClick={handleProgressBarClick}
            />
        </SingleLayerBtn>
    );
}