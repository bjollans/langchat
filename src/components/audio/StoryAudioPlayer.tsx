import { useState } from "react";

interface StoryAudioPlayerProps {
    src: string;
    onTimeUpdate: (currentTime: number) => void;
}

export default function StoryAudioPlayer(props: StoryAudioPlayerProps) {
    const [currentTime, setCurrentTime] = useState(0);

    const handleTimeUpdate = (e: React.SyntheticEvent<HTMLAudioElement>) => {
        const audioElement = e.target as HTMLAudioElement;
        props.onTimeUpdate(audioElement.currentTime);
        setCurrentTime(audioElement.currentTime);
    };

    return (
        <div>
            <p>{currentTime}</p>
            <audio controls onTimeUpdate={handleTimeUpdate}>
                <source src={props.src} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    )
}