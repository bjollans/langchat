import { Btn, Div, P, SingleLayerBtn, Span } from "linguin-shared/components/RnTwComponents";
import { useDailyReadStatContext } from "linguin-shared/context/dailyReadStatContext";
import { RnSoundContext } from "linguin-shared/context/rnSoundContext";
import { useRnTouchableContext } from "linguin-shared/context/rnTouchableContext";
import { useStoryAudioContext } from "linguin-shared/context/storyAudioContext";
import { StoryTranslationIdContext } from "linguin-shared/context/storyTranslationIdContext";
import { TermTranslation } from "linguin-shared/model/translations";
import usePostHog from 'linguin-shared/util/usePostHog';
import { useContext, useEffect, useState } from "react";
import TranslatedWordHoverBox from "./TranslatedWordHoverBox";
import { useLanguageContext } from "linguin-shared/context/languageContext";
import { useFuriganaContext } from "linguin-shared/context/furiganaContext";

export interface TranslatedTermProps {
    termTranslation: TermTranslation;
    isHighlighted?: boolean;
}

export default function TranslatedTerm(props: TranslatedTermProps): JSX.Element {
    const posthogClient = usePostHog();
    const [showTranslation, setShowTranslation] = useState(false);
    const [isPlayingStoryAudio, setIsPlayingStoryAudio] = useState(false);
    const storyTranslationId = useContext(StoryTranslationIdContext);
    const RnSound = useContext(RnSoundContext);
    const { addToResetterFunctions } = useRnTouchableContext();
    const { recordStatUpdate } = useDailyReadStatContext();
    const { language } = useLanguageContext();
    const { hasFurigana } = useFuriganaContext();

    const {
        addIsPlayingAudioUpdateFunction,
    } = useStoryAudioContext();

    useEffect(() => {
        addIsPlayingAudioUpdateFunction((isPlayingAudio: boolean) => {
            setIsPlayingStoryAudio(isPlayingAudio);
        });
    }, []);

    const playRnAudio = () => {
        if (isPlayingStoryAudio) return;
        let fileName = language + "-";
        for (let i = 0; i < props.termTranslation.text.length; i++) {
            fileName += props.termTranslation.text.charCodeAt(i) + (i < props.termTranslation.text.length - 1 ? "-" : "");
        }
        const audioSrc = `https://backend.linguin.co/storage/v1/object/public/wordSound/${fileName}.mp3`;
        let rnSound = new RnSound(audioSrc, '', (error) => {
            if (error) return
            rnSound.play();
        });
    }


    const handleClick = () => {
        addToResetterFunctions(() => setShowTranslation(false));
        setShowTranslation(true);
        playRnAudio();
        posthogClient?.capture("view_word_translation", {
            vocab: props.termTranslation.text,
            storyTranslationId: storyTranslationId,
        });
        recordStatUpdate({
            wordsLookedUp: [props.termTranslation.text],
            storiesViewed: [storyTranslationId!],
        });

    }

    return (
        <SingleLayerBtn
            onClick={handleClick}
            onMouseLeave={() => setShowTranslation(false)}
            className="cursor-pointer relative hover:text-indigo-500 cursor-pointer">
            {hasFurigana && <P style={{ fontSize: 12, position: "absolute", top:0, overflow: "visible", whiteSpace: "nowrap" }}>{replaceLastOccurrence(removePunctuation(props.termTranslation.transliteration!), removeNonKana(props.termTranslation.text), "")}</P>}
            {showTranslation && <TranslatedWordHoverBox termTranslation={props.termTranslation} />}
            <P className="text-2xl underline decoration-dotted mx-0.5" style={{color: props.isHighlighted? "#0891b2":"#000000", marginTop: hasFurigana? 12:0, marginBottom: hasFurigana? 12:0}}>
                {props.termTranslation.text}
            </P>
        </SingleLayerBtn>

    );
}

function removeNonKana(text: string) {
    return text.replace(/[^ぁ-ん]/g, "");
}

function removePunctuation(text: string) {
    return text.replaceAll(/[。、，．？！]/g, "");
}

function replaceLastOccurrence(text: string, search: string, replace: string) {
    const lastIndex = text.lastIndexOf(search);
    if (lastIndex !== -1) {
        return text.substring(0, lastIndex) + replace + text.substring(lastIndex + search.length);
    }
    return text;
}