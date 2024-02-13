import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import EqualizerIcon from "linguin-shared/components/audio/EqualizerIcon";
import { StoryIdContext } from 'linguin-shared/context/storyIdContext';
import { useReadUsageContext } from 'linguin-shared/context/trackReadContext';
import { TermTranslation, TranslatedText } from "linguin-shared/model/translations";
import posthog from 'posthog-js';
import { useContext, useState } from "react";
import TranslatedTerm from "./TranslatedWord";
import { Div, P, Span } from 'linguin-shared/components/RnTwComponents';
import { Platform } from 'react-native';
import { LanguageIcon, PlayIcon } from '@heroicons/react/24/solid';

interface TranslatedTextProps {
    translatedText: TranslatedText;
    isHighlighted: boolean;
    isPlayingAudio: boolean;
    hasAudio: boolean;
    onPlayAudio: () => void;
}

export default function TranslatedTextRender(props: TranslatedTextProps): JSX.Element {
    const [showWholeTranslation, setShowWholeTranslation] = useState(false);
    const translatedWords: Array<JSX.Element> = [];
    const storyId = useContext(StoryIdContext);
    const { onReadUsageEvent } = useReadUsageContext();

    if (props.translatedText.translationJson !== undefined) {
        for (var i = 0; i < props.translatedText.content.length; i++) {
            const termAtThisPosition = JSON.parse(JSON.stringify(props.translatedText.translationJson!.terms.filter((termTranslation: TermTranslation) =>
                termTranslation.position <= i && termTranslation.position + termTranslation.text.length > i
            )));
            if (termAtThisPosition && termAtThisPosition.length > 0) {
                translatedWords.push((<TranslatedTerm termTranslation={termAtThisPosition[0]} />));
                i = termAtThisPosition[0].position + termAtThisPosition[0].text.length - 1;
            }
            else {
                translatedWords.push(<Span>{props.translatedText.content[i]}</Span>);
            }
        }
    }

    const handleTranslateClick = () => {
        setShowWholeTranslation(true);
        onReadUsageEvent();
        posthog.capture("view_sentence_translation", {
            storyId: storyId,
        });
    }

    return (<>
        <Span className="relative cursor-pointer"
            onMouseLeave={() => setShowWholeTranslation(false)}>
            <Div className={showWholeTranslation ? "cursor-text absolute bottom-0 left-0 z-50" : "hidden"}>
                <Div className="bg-black text-white rounded-lg p-2 mb-6 w-96 max-w-full mx-auto">
                    <P className="flex">
                        {props.translatedText.translationJson?.wholeSentence?.translation}
                    </P>
                    {props.translatedText.translationJson?.wholeSentence?.transliteration &&
                        <P className="text-sm flex italic mx-auto">
                            {props.translatedText.translationJson?.wholeSentence?.transliteration}
                        </P>
                    }
                </Div>
            </Div>
            <Div className={`relative flex flex-wrap text-2xl items-center ${props.isHighlighted ? "text-cyan-600" : "text-black"}`}>
                <Div className="absolute left-0">
                    {props.hasAudio &&
                        (props.isHighlighted
                            && <EqualizerIcon isAnimated={props.isPlayingAudio} onClick={props.onPlayAudio} />
                            || <_PlayButton onClick={props.onPlayAudio} />)
                    }
                </Div>
                <Div className="mx-8 relative">
                    <P>{translatedWords}
                        <_TranslateButton onClick={handleTranslateClick} />
                    </P>
                </Div>
            </Div>
        </Span>
    </>
    );
}



export function _PlayButton(onClick): JSX.Element {
    if (Platform.OS === 'web') {
        return <PlayIcon className="text-slate-100 w-6 h-6" onClick={onClick} />;
    }
    return (
        <Icon.Button
            name="play_arrow"
            backgroundColor="#ffffff"
            className="text-slate-100 w-6 h-6"
            onPress={onClick}
        />
    );
}

export function _TranslateButton(onClick): JSX.Element {
    if (Platform.OS === 'web') {
        return (<button className="hover:bg-slate-200 text-black font-bold py-2 px-2 mx-4 rounded" onClick={onClick}>
            <LanguageIcon className="h-5 w-5" aria-hidden="true" />
        </button>);
    }
    return (
        <Icon.Button
            name="translate"
            backgroundColor="#ffffff"
            className="text-slate-100 w-6 h-6"
            onPress={onClick}
        />
    );
}