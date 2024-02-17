import Ionicons from '@expo/vector-icons/Ionicons';
import EqualizerIcon from "linguin-shared/components/audio/EqualizerIcon";
import { StoryIdContext } from 'linguin-shared/context/storyIdContext';
import { useReadUsageContext } from 'linguin-shared/context/trackReadContext';
import { TermTranslation, TranslatedText } from "linguin-shared/model/translations";
import posthog from 'posthog-js';
import { useContext, useState } from "react";
import TranslatedTerm from "./TranslatedWord";
import { Div, P, Span, Btn } from 'linguin-shared/components/RnTwComponents';
import { PlayIcon, TranslateIcon } from 'linguin-shared/components/Icons';
import { useRnTouchableContext } from 'linguin-shared/context/rnTouchableContext';

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
    const { addToResetterFunctions } = useRnTouchableContext();

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
        addToResetterFunctions(() => setShowWholeTranslation(false));
        setShowWholeTranslation(true);
        onReadUsageEvent();
        posthog.capture("view_sentence_translation", {
            storyId: storyId,
        });
    }

    return (<>
        <Div className="relative cursor-pointer w-full"
            onMouseLeave={() => setShowWholeTranslation(false)}>
            <Div className={showWholeTranslation ? "cursor-text absolute bottom-0 left-0 z-50" : "hidden"}>
                <Div className="bg-black text-white rounded-lg p-2 mb-6 w-96 max-w-full mx-auto">
                    <P className="flex text-white">
                        {props.translatedText.translationJson?.wholeSentence?.translation}
                    </P>
                    {props.translatedText.translationJson?.wholeSentence?.transliteration &&
                        <P className="text-sm flex italic mx-auto text-white">
                            {props.translatedText.translationJson?.wholeSentence?.transliteration}
                        </P>
                    }
                </Div>
            </Div>
            <Div className={`relative flex flex-row flex-wrap text-2xl items-start ${props.isHighlighted ? "text-cyan-600" : "text-black"}`}>
                <Div className="absolute left-0">
                    {props.hasAudio &&
                        (props.isHighlighted
                            && <EqualizerIcon isAnimated={props.isPlayingAudio} onClick={props.onPlayAudio} />
                            || <Btn onClick={props.onPlayAudio}><PlayIcon /></Btn>)
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