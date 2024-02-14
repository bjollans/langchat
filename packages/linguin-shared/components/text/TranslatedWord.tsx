import { Div, P, Span, Btn, Br } from "linguin-shared/components/RnTwComponents";
import WordPlayerButton from "linguin-shared/components/audio/WordPlayerButton";
import { StoryIdContext } from "linguin-shared/context/storyIdContext";
import { useReadUsageContext } from "linguin-shared/context/trackReadContext";
import { TermTranslation } from "linguin-shared/model/translations";
import posthog from "posthog-js";
import { useContext, useState } from "react";

export interface TranslatedTermProps {
    termTranslation: TermTranslation;
}

export default function TranslatedTerm(props: TranslatedTermProps): JSX.Element {
    const [showTranslation, setShowTranslation] = useState(false);
    const storyId = useContext(StoryIdContext);
    const { onReadUsageEvent } = useReadUsageContext();


    const handleClick = () => {
        setShowTranslation(true);
        // onReadUsageEvent();
        // posthog.capture("view_word_translation", {
        //     vocab: props.termTranslation.text,
        //     storyId: storyId,
        // });
    }

    return (
        <Btn
            onClick={handleClick}
            onMouseLeave={() => setShowTranslation(false)}
            className="cursor-pointer relative mx-0.5 underline decoration-dotted hover:text-indigo-500 cursor-pointer">
            {showTranslation && <Div>
                <Div className="flex flex-row space-x-1 bg-black absolute bottom-0 left-0 rounded-lg p-3 mb-6 mx-auto -space-y-2 items-center">
                    <WordPlayerButton word={props.termTranslation.text} />
                    <Div className="flex flex-col items-start">
                        <P className="text-white align-start text-lg ">{props.termTranslation.translation}</P>
                        {props.termTranslation.transliteration &&
                            <P className="align-start text-white text-sm italic">
                                {props.termTranslation.transliteration}
                            </P>
                        }
                    </Div>

                </Div>
            </Div>}
            <Span>
                {props.termTranslation.text}
            </Span>
        </Btn>

    );
}