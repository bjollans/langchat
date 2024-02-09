import { Div, P, Span } from "components/RnTwComponents";
import WordPlayerButton from "components/audio/WordPlayerButton";
import VocabSaveButton from "components/vocab/VocabSaveButton";
import { StoryIdContext } from "context/storyIdContext";
import { useReadUsageContext } from "context/trackReadContext";
import { TermTranslation } from "model/translations";
import posthog from "posthog-js";
import { useContext, useState } from "react";
import { useAuth } from "util/auth";
import { useVocab } from "util/clientDb";

export interface TranslatedTermProps {
    termTranslation: TermTranslation;
}

export default function TranslatedTerm(props: TranslatedTermProps): JSX.Element {
    const auth = useAuth();
    const [showTranslation, setShowTranslation] = useState(false);
    const { data: vocabList } = useVocab(auth.user?.uid ?? null)
    const vocab = vocabList?.find((vocabItem) => vocabItem.vocab === props.termTranslation.text || vocabItem.vocab === props.termTranslation.infinitive);
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
        <Span
            onClick={handleClick}
            onMouseLeave={() => setShowTranslation(false)}
            className="cursor-pointer relative mx-0.5 underline decoration-dotted hover:text-indigo-500 cursor-pointer">
            {showTranslation && <Div className="cursor-text absolute bottom-0 left-0">
                <Div className="bg-black whitespace-nowrap flex text-white rounded-lg p-2 items-center space-x-2 mb-6 mx-auto">
                    <WordPlayerButton word={props.termTranslation.text} />
                    <Div>
                        <P>
                            {props.termTranslation.translation}
                        </P>
                        {props.termTranslation.transliteration &&
                            <P className="text-sm italic mx-auto">
                                {props.termTranslation.transliteration}
                            </P>
                        }
                    </Div>
                </Div>
            </Div>}
            <Span className={vocab ? "bg-cyan-100" : ""}>
                {props.termTranslation.text}
            </Span>
        </Span>

    );
}