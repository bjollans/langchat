import { PlayIcon } from "@heroicons/react/20/solid";
import { PlayCircleIcon } from "@heroicons/react/24/solid";
import { StoryIdContext } from "context/storyIdContext";
import posthog from "posthog-js";
import { useContext, useMemo, useRef } from "react";

export interface WordPlayerButtonProps {
    word: string;
}

export default function WordPlayerButton({ word }: WordPlayerButtonProps) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const storyId = useContext(StoryIdContext);
    const audioSrc = useMemo(() => {
        let fileName = "";
        for (let i = 0; i < word.length; i++) {
            fileName += word.charCodeAt(i) + (i < word.length-1? "-": "");
        }
        return `https://backend.linguin.co/storage/v1/object/public/wordSound/${fileName}.mp3`;
    }, [word]);

    const play = () => {
        if (audioRef.current) {
            audioRef.current.play();
            posthog.capture("play_word_sound", {
                vocab: word,
                storyId: storyId,
            });
        }
    };

    return (<div>
        <audio ref={audioRef}>
            <source src={audioSrc} type="audio/mpeg" />
            Your browser does not support the audio element.
        </audio>
        <button className="word-player-button" onClick={play}>
            <PlayCircleIcon className="text-sky-300 w-6 h-6" />
        </button>
    </div>);
}