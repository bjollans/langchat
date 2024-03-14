import Ionicons from '@expo/vector-icons/Ionicons';
import EqualizerIconWeb from "linguin-shared/components/audio/EqualizerIconWeb";
import { StoryIdContext } from 'linguin-shared/context/storyIdContext';
import { useReadUsageContext } from 'linguin-shared/context/trackReadContext';
import { AudioSentenceTime, StoryText, TermTranslation, TranslatedText } from "linguin-shared/model/translations";
import { useContext, useState, useEffect, useMemo } from "react";
import TranslatedTerm from "./TranslatedWord";
import { Div, P, Span, Btn } from 'linguin-shared/components/RnTwComponents';
import { PlayIcon, TranslateIcon } from 'linguin-shared/components/Icons';
import { useRnTouchableContext } from 'linguin-shared/context/rnTouchableContext';
import { Platform, Text } from 'react-native';
import EqualizerIconRn from "linguin-shared/components/audio/EqualizerIconRn";
import { useStoryAudioContext } from "linguin-shared/context/storyAudioContext";
import usePostHog from 'linguin-shared/util/usePosthog';

interface TranslatedTextProps {
    story: StoryText;
    translatedText: TranslatedText;
    hasAudio: boolean;
    audioStartTime: number;
    audioEndTime: number;
}

export default function TranslatedTextRender(props: TranslatedTextProps): JSX.Element {
    const posthogClient = usePostHog();
    const [showWholeTranslation, setShowWholeTranslation] = useState(false);
    const storyId = useContext(StoryIdContext);
    const { registerReadUsageEvent } = useReadUsageContext();
    const { addToResetterFunctions } = useRnTouchableContext();
    const [isHighlighted, setIsHighlighted] = useState(false);
    const [isPlayingAudio, setIsPlayingAudio] = useState(false);
    const {
        updateIsPlayingAudio,
        addIsPlayingAudioUpdateFunction,
        updateAudioTimes,
        addAudioTimeUpdateFunction
    } = useStoryAudioContext();


    useEffect(() => {
        var isPlayingClojureState = false;
        addIsPlayingAudioUpdateFunction((isPlayingAudio: boolean) => {
            isPlayingClojureState = isPlayingAudio;
            setIsPlayingAudio(isPlayingClojureState);
        });

        var isHighlightedClojureState = false;
        addAudioTimeUpdateFunction((audioTime: number) => {
            if (audioTime > 0 && audioTime < props.audioEndTime - 0.0001 && audioTime >= props.audioStartTime - 0.000) {
                if (!isHighlightedClojureState) {
                    isHighlightedClojureState = true;
                    setIsHighlighted(isHighlightedClojureState);
                }
            } else {
                if (isHighlightedClojureState) {
                    isHighlightedClojureState = false;
                    setIsHighlighted(isHighlightedClojureState);
                }
            }
        });
    }, []);


    const onPlayAudio = () => { updateAudioTimes(props.audioStartTime - 0.00001); updateIsPlayingAudio(true) };
    const onTogglePlayAudio = () => { updateIsPlayingAudio(!isPlayingAudio) };

    const getTranslatedWords = () => {
        const translatedWords: Array<JSX.Element> = [];
        if (props.translatedText.translationJson !== undefined) {
            for (var i = 0; i < props.translatedText.content.length; i++) {
                const termAtThisPosition = JSON.parse(JSON.stringify(props.translatedText.translationJson!.terms.filter((termTranslation: TermTranslation) =>
                    termTranslation.position <= i && termTranslation.position + termTranslation.text.length > i
                )));
                if (termAtThisPosition && termAtThisPosition.length > 0) {
                    translatedWords.push((<TranslatedTerm termTranslation={termAtThisPosition[0]} isHighlighted={isHighlighted} />));
                    i = termAtThisPosition[0].position + termAtThisPosition[0].text.length - 1;
                }
                else {
                    translatedWords.push(<Span className={`relative mx-0.5 text-2xl ${isHighlighted ? "text-cyan-600" : "text-black"}`}>{props.translatedText.content[i]}</Span>);
                }
            }
        }
        return translatedWords;
    };
    const translatedWords = useMemo(() => getTranslatedWords(), [props.translatedText.content, isHighlighted]);



    const handleTranslateClick = () => {
        addToResetterFunctions(() => setShowWholeTranslation(false));
        setShowWholeTranslation(true);
        registerReadUsageEvent();
        posthogClient?.capture("view_sentence_translation", {
            storyId: storyId,
        });
    }

    return (<>
        <Div className="relative cursor-pointer w-full"
            onMouseLeave={() => setShowWholeTranslation(false)}>
            <Div className={showWholeTranslation ? "cursor-text absolute bottom-0 left-0 z-50" : "hidden"} style={{ maxWidth: "80%" }}>
                <Div className="bg-black text-white rounded-lg p-2 mb-6 w-96 max-w-full mx-auto">
                    <P className="flex text-white items-start">
                        {props.translatedText.translationJson?.wholeSentence?.translation}
                    </P>
                    {props.translatedText.translationJson?.wholeSentence?.transliteration &&
                        <P className="text-sm flex italic items-start text-white">
                            {props.translatedText.translationJson?.wholeSentence?.transliteration}
                        </P>
                    }
                </Div>
            </Div>
            <Div className={`relative flex flex-row flex-wrap text-2xl items-start ${isHighlighted ? "text-cyan-600" : "text-black"}`}>
                <Div className="absolute left-0">
                    {props.hasAudio &&
                        (isHighlighted
                            && (
                                Platform.OS == "web"
                                && <EqualizerIconWeb isAnimated={isPlayingAudio} onClick={onTogglePlayAudio} />
                                || <EqualizerIconRn isAnimated={isPlayingAudio} onClick={onTogglePlayAudio} />
                            )
                            || <Btn onClick={onPlayAudio}><PlayIcon /></Btn>)
                    }
                </Div>
                <Div className="mx-8 flex flex-row items-center justify-between">
                    <Span>{translatedWords}</Span>
                    <Btn className="hover:bg-slate-200 text-black font-bold rounded" onClick={handleTranslateClick}>
                        <TranslateIcon />
                    </Btn>
                </Div>
            </Div>
        </Div>
    </>
    );
}