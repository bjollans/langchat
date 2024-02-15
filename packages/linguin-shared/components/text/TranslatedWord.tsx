import { Btn, Span } from "linguin-shared/components/RnTwComponents";
import { StoryIdContext } from "linguin-shared/context/storyIdContext";
import { useReadUsageContext } from "linguin-shared/context/trackReadContext";
import { TermTranslation } from "linguin-shared/model/translations";
import posthog from "posthog-js";
import { useContext, useState } from "react";
import TranslatedWordHoverBox from "./TranslatedWordHoverBox";

export interface TranslatedTermProps {
    termTranslation: TermTranslation;
}

export default function TranslatedTerm(props: TranslatedTermProps): JSX.Element {
    const [showTranslation, setShowTranslation] = useState(false);
    const storyId = useContext(StoryIdContext);
    const { onReadUsageEvent } = useReadUsageContext();


    const handleClick = () => {
        setShowTranslation(true);
        onReadUsageEvent();
        posthog.capture("view_word_translation", {
            vocab: props.termTranslation.text,
            storyId: storyId,
        });
    }

    return (
        <Btn
            onClick={handleClick}
            onMouseLeave={() => setShowTranslation(false)}
            className="cursor-pointer relative mx-0.5 underline decoration-dotted hover:text-indigo-500 cursor-pointer">
            {showTranslation && <TranslatedWordHoverBox termTranslation={props.termTranslation} />}
            <Span>
                {props.termTranslation.text}
            </Span>
        </Btn>

    );
}