import { PauseIcon, PlayIcon } from '@heroicons/react/24/solid';
import { Audio, Btn, Div } from 'linguin-shared/components/RnTwComponents';
import { useStoryAudioContext } from 'linguin-shared/context/storyAudioContext';
import { useReadUsageContext } from 'linguin-shared/context/trackReadContext';
import { RnSoundContext } from "linguin-shared/context/rnSoundContext";
import posthog from 'posthog-js';
import { useEffect, useRef, useState, useContext } from 'react';
import { Platform, Text } from 'react-native';
import { PlayCircleIcon, PauseCircleIcon } from 'linguin-shared/components/Icons';

interface StoryAudioPlayerProps {
    src: string;
}

export default function StoryAudioPlayer(props: StoryAudioPlayerProps) {
    const [duration, setDuration] = useState(-1);
    const [rnAudio, setRnAudio] = useState<any>(null);
    const [currentAudioTime, setCurrentAudioTime] = useState(0);
    const [isPlayingAudio, setIsPlayingAudio] = useState(false);
    const [rnProgressBarWidth, setRnProgressBarWidth] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [progressBarWidth, setProgressBarWidth] = useState<string | number>('0%');
    const { onReadUsageEvent } = useReadUsageContext();
    const RnSound = useContext(RnSoundContext);

    var rnAudioUpdateInterval: any;

    useEffect(() => {
        if (!rnAudio || rnAudioUpdateInterval) return;
        rnAudioUpdateInterval = setInterval(() => {
            rnAudio.getCurrentTime((seconds) => {
                updateAudioTimes(seconds);
            });
        }, 2000);
        return () => clearInterval(rnAudioUpdateInterval);
    }, [rnAudio]);

    const {
        updateIsPlayingAudio,
        addIsPlayingAudioUpdateFunction,
        updateAudioTimes,
        addAudioTimeUpdateFunction
    } = useStoryAudioContext();


    const playRnAudio = () => {
        if (!RnSound) return;
        let rnSound = new RnSound(props.src, '', (error) => {
            if (error) return
            rnSound.setCurrentTime(currentAudioTime);
            rnSound.play();
            setDuration(rnSound.getDuration());
        });
        return rnSound;
    }

    const play = () => {
        if (Platform.OS === 'web') {
            if (audioRef.current) {
                audioRef.current.play();
                updateIsPlayingAudio(true);
                onReadUsageEvent();
            }
        } else {
            setRnAudio(playRnAudio());
            updateIsPlayingAudio(true);
            onReadUsageEvent();
        }
    };

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

    useEffect(() => {
        if (rnAudio) {
            addAudioTimeUpdateFunction((audioTime: number) => {
                rnAudio.getCurrentTime((seconds) => { 
                    if (Math.abs(audioTime - seconds) > 1) rnAudio?.setCurrentTime(audioTime);
                });
            });
        }
    }, [rnAudio]);

    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
        if (rnAudio) {
            rnAudio.pause();
        }
        updateIsPlayingAudio(false);
    };

    const togglePlayPause = () => {
        if (isPlayingAudio) {
            pause();
        } else {
            play();
        }
    };

    const onEnded = () => {
        posthog.capture('audio_ended', { src: props.src.split('/').pop() });
    };

    useEffect(() => {
        if (isPlayingAudio) {
            if (rnAudio) rnAudio.play();
            if (audioRef.current) audioRef.current.play();
        } else {
            if (rnAudio) rnAudio.pause();
            if (audioRef.current) audioRef.current.pause();
        }
    }, [isPlayingAudio]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const onPlay = () => updateIsPlayingAudio(true);
        audio.addEventListener('play', onPlay);

        const onPause = () => updateIsPlayingAudio(false);
        audio.addEventListener('pause', onPause);

        setDuration(audio.duration);

        // Remove event listeners on cleanup
        return () => {
            audio.removeEventListener('play', onPlay);
            audio.removeEventListener('pause', onPause);
        };
    }, [audioRef]);

    const handleTimeUpdate = (e: React.SyntheticEvent<HTMLAudioElement>) => {
        const audioElement = e.target as HTMLAudioElement;
        updateAudioTimes(audioElement.currentTime);
    };

    const handleProgressBarClick = (e) => {
        if (Platform.OS === 'web') {
            const progressBar = e.currentTarget;
            const clickX = e.clientX - progressBar.getBoundingClientRect().left;
            const newTime = (clickX / progressBar.offsetWidth) * (audioRef.current?.duration || 0);
            if (audioRef.current) {
                audioRef.current.currentTime = newTime;
            }
            updateAudioTimes(newTime);
        } else {
            if (!rnAudio) return;
            const clickX = e.nativeEvent.locationX;
            const newTime = (clickX / rnProgressBarWidth) * duration;
            rnAudio.setCurrentTime(newTime);
            updateAudioTimes(newTime);
            setProgressBarWidth(Math.floor(clickX));
        }
    };

    useEffect(() => {
        const currentAudioPercentageTime = Math.floor((currentAudioTime / duration) * 100);
        if (Platform.OS === 'web') {
            if (audioRef.current && Math.abs(currentAudioTime - audioRef.current.currentTime) > 2) {
                audioRef.current.currentTime = currentAudioTime;
                setProgressBarWidth(`${currentAudioPercentageTime}%`);
            }
        } else {
            //TODO
            setProgressBarWidth((currentAudioPercentageTime * rnProgressBarWidth) / 100);
            console.log("currentAudioPercentageTime* rnProgressBarWidth) / 100 = ", ((currentAudioPercentageTime * rnProgressBarWidth) / 100));
            console.log("currentAudioPercentageTime = ", currentAudioPercentageTime);
            console.log("rnProgressBarWidth = ", rnProgressBarWidth);
        }
    }, [currentAudioTime, duration]);

    console.log("Storyaudioplayer render")

    return (
        <Div className='bg-white fixed bottom-0 left-0 right-0 drop-shadow-xl border'>
            <Btn
                className='h-2 bg-gray-200 cursor-pointer'
                style={{ width: "100%" }}
                onClick={handleProgressBarClick}
                onLayout={(e) => setRnProgressBarWidth(e.nativeEvent.layout.width)}
            >
                <Div className='bg-cyan-600 h-2' style={{ width: progressBarWidth }}></Div>
            </Btn>
            {Platform.OS === 'web' &&
                <audio
                    onEnded={onEnded}
                    ref={audioRef}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleTimeUpdate}
                >
                    <source src={props.src} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>}
            <Btn className='flex my-1 rounded-full mx-auto' onClick={togglePlayPause}>
                {_PlayButton(isPlayingAudio)}
            </Btn>
        </Div>
    )
}


function _PlayButton(isPlayingAudio): JSX.Element {
    if (Platform.OS === 'web') {
        return isPlayingAudio
            ? <PauseIcon className='rounded-full border-4 border-slate-600 text-slate-600 w-12 h-12' />
            : <PlayIcon className='rounded-full border-4 pl-1 border-slate-600 text-slate-600 w-12 h-12' />;
    }
    return isPlayingAudio
        ? <PauseCircleIcon />
        : <PlayCircleIcon />;
}