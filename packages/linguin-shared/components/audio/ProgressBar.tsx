import { PauseIcon, PlayIcon } from '@heroicons/react/24/solid';
import { Audio, Btn, Div } from 'linguin-shared/components/RnTwComponents';
import { useStoryAudioContext } from 'linguin-shared/context/storyAudioContext';
import { useReadUsageContext } from 'linguin-shared/context/trackReadContext';
import { RnSoundContext } from "linguin-shared/context/rnSoundContext";
import posthog from 'posthog-js';
import { useEffect, useRef, useState, useContext } from 'react';
import { Platform, Text } from 'react-native';
import { PlayCircleIcon, PauseCircleIcon } from 'linguin-shared/components/Icons';

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
            setProgressBarWidth(Math.floor(clickX));
        }
    };

    useEffect(() => {
        const currentAudioPercentageTime = Math.floor((currentAudioTime / props.duration) * 100);
        if (Platform.OS === 'web') {
            setProgressBarWidth(`${currentAudioPercentageTime}%`);
        } else {
            setProgressBarWidth((currentAudioPercentageTime * rnProgressBarWidth) / 100);
        }
    }, [currentAudioTime, props.duration]);

    return (
        <Btn
            className='h-2 bg-gray-200 cursor-pointer'
            style={{ width: "100%" }}
            onClick={handleProgressBarClick}
            onLayout={(e) => setRnProgressBarWidth(e.nativeEvent.layout.width)}
        >
            <Div className='bg-cyan-600 h-2' style={{ width: progressBarWidth }}></Div>
        </Btn>
    )
}