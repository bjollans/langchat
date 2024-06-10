import { PlayIcon, TranslateIcon } from 'linguin-shared/components/Icons';
import { Btn, Div, P, Span } from 'linguin-shared/components/RnTwComponents';
import EqualizerIconRn from "linguin-shared/components/audio/EqualizerIconRn";
import EqualizerIconWeb from "linguin-shared/components/audio/EqualizerIconWeb";
import { useDailyReadStatContext } from 'linguin-shared/context/dailyReadStatContext';
import { useRnTouchableContext } from 'linguin-shared/context/rnTouchableContext';
import { useStoryAudioContext } from "linguin-shared/context/storyAudioContext";
import { StoryTranslationIdContext } from 'linguin-shared/context/storyTranslationIdContext';
import { TermTranslation, TranslatedText } from "linguin-shared/model/translations";
import usePostHog from 'linguin-shared/util/usePostHog';
import { useContext, useEffect, useMemo, useState } from "react";
import { InView as InViewWeb } from 'react-intersection-observer';
import { Platform } from 'react-native';
import { InView as InViewRn } from 'react-native-intersection-observer';
import TranslatedTerm from "./TranslatedWord";

interface SentenceRenderProps {
    translatedText: TranslatedText;
    hasAudio: boolean;
    audioStartTime: number;
    audioEndTime: number;
}

export default function SentenceRender(props: SentenceRenderProps): JSX.Element {
    const posthogClient = usePostHog();
    const [showWholeTranslation, setShowWholeTranslation] = useState(false);
    const storyTranslationId = useContext(StoryTranslationIdContext);
    const { addToResetterFunctions } = useRnTouchableContext();
    const [isHighlighted, setIsHighlighted] = useState(false);
    const [isPlayingAudio, setIsPlayingAudio] = useState(false);
    const {
        updateIsPlayingAudio,
        addIsPlayingAudioUpdateFunction,
        updateAudioTimes,
        addAudioTimeUpdateFunction
    } = useStoryAudioContext();
    const { recordStatUpdate } = useDailyReadStatContext();

    const considerReadAfterSeconds = 15;

    let wordStatUpdated = false;
    let wordStatInterval: any = null;

    function reactToVisible(visible: boolean) {
        if (visible && !wordStatUpdated && !wordStatInterval) {
            wordStatInterval = setTimeout(() => {
                recordStatUpdate({
                    wordsSeen: props.translatedText.translationJson!.terms.map((termTranslation: TermTranslation) => termTranslation.text),
                    storiesViewed: [storyTranslationId!],
                });
                wordStatUpdated = true;
            }, considerReadAfterSeconds * 1000);
        }
        else {
            if (wordStatInterval) {
                clearTimeout(wordStatInterval);
                wordStatInterval = undefined;
            }
        }
    }


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
                    translatedWords.push(<Span style={{ position: 'relative', margin: '0 2px', fontSize: 24, color: isHighlighted ? "#0891b2" : "#000000" }}>{props.translatedText.content[i]}</Span>);
                }
            }
        }
        return translatedWords;
    };
    const translatedWords = useMemo(() => getTranslatedWords(), [props.translatedText.content, isHighlighted]);

    const handleTranslateClick = () => {
        addToResetterFunctions(() => setShowWholeTranslation(false));
        setShowWholeTranslation(true);
        posthogClient?.capture("view_sentence_translation", {
            storyTranslationId: storyTranslationId,
        });
    }

    return (<>
        <Div
            style={{ position: 'relative', cursor: 'pointer', width: '100%' }}
            onMouseLeave={() => setShowWholeTranslation(false)}
        >
            <Div 
                style={{ 
                    display: showWholeTranslation ? 'block' : 'none', 
                    cursor: 'text', 
                    position: 'absolute', 
                    bottom: 0, 
                    left: 0, 
                    zIndex: 50, 
                    maxWidth: '80%' 
                }}
            >
                <Div
                    style={{ 
                        backgroundColor: '#000', 
                        color: '#fff', 
                        borderRadius: 8, 
                        padding: 8, 
                        marginBottom: 24, 
                        width: '24rem', 
                        maxWidth: '100%', 
                        margin: 'auto' 
                    }}>
                    <P style={{ display: 'flex', color: '#fff', alignItems: 'flex-start' }}>
                        {props.translatedText.translationJson?.wholeSentence?.translation}
                    </P>
                    {props.translatedText.translationJson?.wholeSentence?.transliteration &&
                        <P 
                            style={{ 
                                fontSize: 14, 
                                display: 'flex', 
                                fontStyle: 'italic', 
                                alignItems: 'flex-start', 
                                color: '#fff' 
                            }}
                        >
                            {props.translatedText.translationJson?.wholeSentence?.transliteration}
                        </P>
                    }
                </Div>
            </Div>
            <Div 
                style={{ 
                    position: 'relative', 
                    display: 'flex', 
                    flexDirection: 'row', 
                    flexWrap: 'wrap', 
                    fontSize: 24, 
                    alignItems: 'center', 
                    color: isHighlighted ? "#0891b2" : '#000000' 
                }}
            >
                <Div style={{ position: 'absolute', left: 0 }}>
                    {props.hasAudio &&
                        (isHighlighted
                            && (
                                Platform.OS === 'web'
                                ? <EqualizerIconWeb isAnimated={isPlayingAudio} onClick={onTogglePlayAudio} />
                                : <EqualizerIconRn isAnimated={isPlayingAudio} onClick={onTogglePlayAudio} />
                            )
                            || <Btn onClick={onPlayAudio}><PlayIcon /></Btn>)
                    }
                </Div>
                <Div style={{ margin: '0 2rem', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Span>{translatedWords}</Span>
                    <Btn 
                        style={{
                            backgroundColor: 'transparent',
                            color: '#000', 
                            fontWeight: 'bold', 
                            borderRadius: 6,
                        }}
                        onClick={handleTranslateClick}
                    >
                        <TranslateIcon />
                    </Btn>
                </Div>
            </Div>
            <InView onChange={(inView: boolean) => reactToVisible(inView)} >
                <Span style={{ fontSize: 1 }}> </Span>
            </InView>
        </Div >
    </>
    );
}

function InView({ onChange, children }: { onChange: (inView: boolean) => void, children: JSX.Element }) {
    if (Platform.OS === 'web') {
        return <InViewWeb onChange={onChange}>{children}</InViewWeb>;
    }
    else {
        return <InViewRn onChange={onChange}>{children}</InViewRn>;
    }
}