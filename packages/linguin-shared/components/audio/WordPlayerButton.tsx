import { StoryIdContext } from "linguin-shared/context/storyIdContext";
import posthog from "posthog-js";
import { useContext, useMemo, useRef } from "react";
import { Platform} from "react-native";
import { Btn, Div } from "linguin-shared/components/RnTwComponents";
import { PlayCircleIcon } from "linguin-shared/components/Icons";
import Sound from 'react-native-sound';

export interface WordPlayerButtonProps {
    word: string;
}

export default function WordPlayerButton({ word }: WordPlayerButtonProps) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const storyId = useContext(StoryIdContext);
    const audioSrc = useMemo(() => {
        let fileName = "";
        for (let i = 0; i < word.length; i++) {
            fileName += word.charCodeAt(i) + (i < word.length - 1 ? "-" : "");
        }
        return `https://backend.linguin.co/storage/v1/object/public/wordSound/${fileName}.mp3`;
    }, [word]);

    const rnSound = useMemo(() => {
        return new Sound(audioSrc, '', (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }
        });
    }, [audioSrc]);

    const play = () => {
        console.log("PLAYING AUDIO!!!");
        if (Platform.OS == "web") {
            if (audioRef.current) {
                audioRef.current.play();
                posthog.capture("play_word_sound", {
                    vocab: word,
                    storyId: storyId,
                });
            }
        } else {
            rnSound.play();
        }
    };

    return (<Div>
        {Platform.OS == "web" && <audio ref={audioRef}>
            <source src={audioSrc} type="audio/mpeg" />
            Your browser does not support the audio element.
        </audio>}
        <Btn className="word-player-button" onClick={play}>
            <PlayCircleIcon />
        </Btn>
    </Div>);
}