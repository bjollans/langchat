import { PlayIcon, TranslateIcon } from 'linguin-shared/components/Icons';
import { Btn, Div, P, RnOnlyDiv, Span } from 'linguin-shared/components/RnTwComponents';
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
import { createStyleSheet, useStyles } from 'react-native-unistyles'

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
    const { styles } = useStyles(stylesheet, {
        textHighlighted: isHighlighted,
        showTranslation: showWholeTranslation,
    })

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
                } else if (props.translatedText.content[i] && props.translatedText.content[i].length > 0) {
                    translatedWords.push(<RnOnlyDiv><Span style={styles.noTranslationStyle}>{props.translatedText.content[i]}</Span></RnOnlyDiv>);
                }
                else {
                    translatedWords.push(<Span style={styles.newLineStyle}>{props.translatedText.content[i]}</Span>);
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
        <Div style={styles.parentContainer}
            onMouseLeave={() => setShowWholeTranslation(false)}>
            <Div style={styles.sentenceTranslationContainer}>
                <Div style={styles.sentenceTranslationText}>
                    <P style={styles.translationText}>
                        {props.translatedText.translationJson?.wholeSentence?.translation}
                    </P>
                    {props.translatedText.translationJson?.wholeSentence?.transliteration &&
                        <P style={styles.transliterationText}>
                            {props.translatedText.translationJson?.wholeSentence?.transliteration}
                        </P>
                    }
                </Div>
            </Div>
            <Div style={styles.wholeSentence}>
                <Div style={styles.playButton}>
                    {props.hasAudio &&
                        (isHighlighted
                            && (Platform.OS === 'web'
                                ? <EqualizerIconWeb isAnimated={isPlayingAudio} onClick={onTogglePlayAudio} />
                                : <EqualizerIconRn isAnimated={isPlayingAudio} onClick={onTogglePlayAudio} />)
                            || <Btn onClick={onPlayAudio}><PlayIcon /></Btn>)
                    }
                </Div>
                <P style={styles.sentenceText}>{translatedWords}</P>
                <Btn
                    style={styles.translationButton}
                    onClick={handleTranslateClick}
                >
                    <TranslateIcon />
                </Btn>
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

const stylesheet = createStyleSheet((theme: any) => ({
    parentContainer: {
        position: 'relative',
        cursor: 'pointer',
        width: '100%',
        marginBottom: Platform.OS == 'web' ? 4 : 18,
    },
    wholeSentence: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        fontSize: 24,
        alignItems: 'center',
        variants: {
            textHighlighted: { true: { color: "#0891b2" }, false: { color: '#000000' } }
        }
    },
    playButton: {
        position: 'relative',
        paddingRight: 12,
        paddingLeft: 12,
    },
    translationButton: {
        backgroundColor: 'transparent',
        color: '#000',
        fontWeight: 'bold',
        borderRadius: 6,
        paddingRight: 12,
        paddingLeft: 12,
    },
    sentenceText: {
        flex: 2,
    },
    sentenceTranslationContainer: {
        cursor: 'text',
        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: 50,
        maxWidth: '80%',
        variants: {
            showTranslation: { true: { display: 'flex' }, false: { display: 'none' } }
        }
    },
    sentenceTranslationText: {
        backgroundColor: '#000',
        color: '#fff',
        borderRadius: 8,
        padding: 8,
        marginBottom: 24,
        width: 384,
        maxWidth: '100%',
        margin: 'auto'
    },
    transliterationText: {
        fontSize: 14,
        display: 'flex',
        fontStyle: 'italic',
        alignItems: 'flex-start',
        color: '#fff'
    },
    translationText: { display: 'flex', color: '#fff', alignItems: 'flex-start' },
    newLineStyle: {
        position: 'relative',
        marginTop: 0,
        marginBottom: 0,
        marginRight: 2,
        marginLeft: 2,
    },
    noTranslationStyle: {
        fontSize: 24,
    }
}));