import { PauseIcon, PlayIcon } from '@heroicons/react/24/solid';
import { Div, SingleLayerBtn } from 'linguin-shared/components/RnTwComponents';
import { useStoryAudioContext } from 'linguin-shared/context/storyAudioContext';
import { RnSoundContext } from "linguin-shared/context/rnSoundContext";
import { useEffect, useRef, useState, useContext } from 'react';
import { Platform } from 'react-native';
import { PlayCircleIcon, PauseCircleIcon } from 'linguin-shared/components/Icons';
import ProgressBar from './ProgressBar';
import usePostHog from 'linguin-shared/util/usePostHog';

interface StoryAudioPlayerProps {
    src: string;
}

export default function StoryAudioPlayer(props: StoryAudioPlayerProps) {
    const [duration, setDuration] = useState(-1);
    const [rnAudio, setRnAudio] = useState<any>(null);
    const [currentAudioTime, setCurrentAudioTime] = useState(0);
    const [isPlayingAudio, setIsPlayingAudio] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const RnSound = useContext(RnSoundContext);
    const posthogClient = usePostHog();

    var rnAudioUpdateInterval: any;
    
    useEffect(() => {
        if (Platform.OS === 'web') return;
        RnSound.setCategory('Playback');
    }, []);

    useEffect(() => {
        if (!rnAudio || rnAudioUpdateInterval) return;
        rnAudioUpdateInterval = setInterval(() => {
            rnAudio.getCurrentTime((seconds) => {
                updateAudioTimes(seconds);
            });
        }, 500);
        return () => clearInterval(rnAudioUpdateInterval);
    }, [rnAudio]);

    const {
        updateIsPlayingAudio,
        addIsPlayingAudioUpdateFunction,
        updateAudioTimes,
        addAudioTimeUpdateFunction
    } = useStoryAudioContext();

    useEffect(() => {
        if (Platform.OS === 'web') return;
        const rnAudio = new RnSound(props.src, '', (error) => {
            if (error) return;
            setDuration(rnAudio.getDuration());
        });
        setRnAudio(rnAudio);
    }, []);


    const playRnAudio = () => {
        if (!RnSound) return;
        rnAudio.setCurrentTime(currentAudioTime);
        rnAudio.play();
    }

    const play = () => {
        if (Platform.OS === 'web') {
            if (audioRef.current) {
                audioRef.current.play();
                updateIsPlayingAudio(true);
            }
        } else {
            playRnAudio();
            updateIsPlayingAudio(true);
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

    useEffect(() => {
        if (audioRef && audioRef.current) {
            addAudioTimeUpdateFunction((audioTime: number) => {
                if (Math.abs(audioTime - audioRef!.current!.currentTime) > 2) {
                    audioRef!.current!.currentTime = audioTime;
                }
            });
        }
    }, [audioRef]);

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
        posthogClient?.capture('audio_ended', { src: props.src.split('/').pop() });
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

    return (
        <Div className='bg-white fixed bottom-0 left-0 right-0 drop-shadow-xl border'>
            <ProgressBar duration={Platform.OS == "web" ? audioRef?.current?.duration || 0 : duration} />
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
            <SingleLayerBtn className='flex my-1 rounded-full mx-auto' onClick={togglePlayPause}>
                {_PlayButton(isPlayingAudio)}
            </SingleLayerBtn>
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