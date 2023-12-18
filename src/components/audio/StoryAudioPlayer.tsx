import { PauseCircleIcon, PauseIcon, PlayCircleIcon, PlayIcon } from '@heroicons/react/24/solid';
import posthog from 'posthog-js';
import { useState, useRef, useEffect } from 'react';

interface StoryAudioPlayerProps {
    src: string;
    currentTime: number;
    isPlaying: boolean;
    onTimeUpdate: (currentTime: number) => void;
    onPlayPause: (isPlayingAudio: boolean) => void
}

export default function StoryAudioPlayer(props: StoryAudioPlayerProps) {
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [progressBarWidth, setProgressBarWidth] = useState('0%');

    const play = () => {
        if (audioRef.current) {
            audioRef.current.play();
            props.onPlayPause(true);
        }
    };

    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            props.onPlayPause(false);
        }
    };

    const togglePlayPause = () => {
        if (props.isPlaying) {
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
        if (props.isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [props.isPlaying]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const onPlay = () => props.onPlayPause(true);
        audio.addEventListener('play', onPlay);

        const onPause = () => props.onPlayPause(false);
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
        props.onTimeUpdate(audioElement.currentTime);
    };

    const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const progressBar = e.currentTarget;
        const clickX = e.clientX - progressBar.getBoundingClientRect().left;
        const newTime = (clickX / progressBar.offsetWidth) * (audioRef.current?.duration || 0);
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
            props.onTimeUpdate(newTime);
        }
    };

    useEffect(() => {
        if (audioRef.current && Math.abs(props.currentTime - audioRef.current.currentTime) > 0.5) {
            audioRef.current.currentTime = props.currentTime;
        }
        setProgressBarWidth(`${(props.currentTime / duration) * 100}%`);
    }, [props.currentTime, duration]);

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
                {props.isPlaying
                    ? <PauseIcon className='rounded-full border-4 border-slate-600 text-slate-600 w-12 h-12' />
                    : <PlayIcon className='rounded-full border-4 pl-1 border-slate-600 text-slate-600 w-12 h-12' />}
            </button>
        </div>
    )
}