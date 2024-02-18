import { Btn } from 'linguin-shared/components/RnTwComponents';
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
        <Btn
            className='h-2 bg-gray-200 cursor-pointer'
            onClick={handleProgressBarClick}
            onLayout={(e) => setRnProgressBarWidth(e.nativeEvent.layout.width)}
        >
            <Btn className='bg-cyan-600 shadow-lg h-2' style={{ width: progressBarWidth }}
                onClick={handleProgressBarClick} />
        </Btn>
    )
}