import { PauseIcon, PlayIcon } from '@heroicons/react/24/solid';
import { useStoryAudioContext } from 'context/storyAudioContext';
import { OnReadUsageEvent } from 'context/trackReadContext';
import posthog from 'posthog-js';
import { useContext, useEffect, useRef, useState } from 'react';

interface StoryAudioPlayerProps {
    src: string;
}

export default function StoryAudioPlayer(props: StoryAudioPlayerProps) {
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [progressBarWidth, setProgressBarWidth] = useState('0%');
    const onReadUsageEvent = useContext(OnReadUsageEvent);

    const {
        currentAudioTime,
        setCurrentAudioTime,
        isPlayingAudio,
        setIsPlayingAudio,
        hasPlayedAudio,
        setHasPlayedAudio
    } = useStoryAudioContext();

    const play = () => {
        if (audioRef.current) {
            audioRef.current.play();
            setIsPlayingAudio(true);
            onReadUsageEvent();
        }
    };

    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlayingAudio(false);
        }
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
        if (!audioRef.current) return;
        if (isPlayingAudio) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlayingAudio]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const onPlay = () => setIsPlayingAudio(true);
        audio.addEventListener('play', onPlay);

        const onPause = () => setIsPlayingAudio(false);
        audio.addEventListener('pause', onPause);

        const onLoadedMetadata = () => {
            setDuration(audio.duration);
        };
        audio.addEventListener('loadedmetadata', onLoadedMetadata);

        // Remove event listeners on cleanup
        return () => {
            audio.removeEventListener('play', onPlay);
            audio.removeEventListener('pause', onPause);
            audio.removeEventListener('loadedmetadata', onLoadedMetadata);
        };
    }, []);

    const handleTimeUpdate = (e: React.SyntheticEvent<HTMLAudioElement>) => {
        const audioElement = e.target as HTMLAudioElement;
        setCurrentAudioTime(audioElement.currentTime);
    };

    const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const progressBar = e.currentTarget;
        const clickX = e.clientX - progressBar.getBoundingClientRect().left;
        const newTime = (clickX / progressBar.offsetWidth) * (audioRef.current?.duration || 0);
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
            setCurrentAudioTime(newTime);
        }
    };

    useEffect(() => {
        if (audioRef.current && Math.abs(currentAudioTime - audioRef.current.currentTime) > 2) {
            audioRef.current.currentTime = currentAudioTime;
        }
        setProgressBarWidth(`${(currentAudioTime / duration) * 100}%`);
    }, [currentAudioTime, duration]);

    return (
        <div className='bg-white fixed bottom-0 left-0 right-0 drop-shadow-xl border'>
            <div
                className='w-full h-2 bg-gray-200 cursor-pointer'
                onClick={handleProgressBarClick}
            >
                <div className='bg-cyan-600 h-2' style={{ width: progressBarWidth }}></div>
            </div>
            <audio
                onEnded={onEnded}
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleTimeUpdate}
            >
                <source src={props.src} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <button className='w-full justify-center flex my-1 rounded-full' onClick={togglePlayPause}>
                {isPlayingAudio
                    ? <PauseIcon className='rounded-full border-4 border-slate-600 text-slate-600 w-12 h-12' />
                    : <PlayIcon className='rounded-full border-4 pl-1 border-slate-600 text-slate-600 w-12 h-12' />}
            </button>
        </div>
    )
}