import VocabSaveButton from "components/vocab/VocabSaveButton";
import { StoryIdContext } from "context/storyIdContext";
import { OnReadUsageEvent } from "context/trackReadContext";
import { TermTranslation } from "model/translations";
import posthog from "posthog-js";
import { useContext, useState } from "react";
import { useAuth } from "util/auth";
import { useVocab } from "util/db";

export interface TranslatedTermProps {
    termTranslation: TermTranslation;
}

export default function TranslatedTerm(props: TranslatedTermProps): JSX.Element {
    const auth = useAuth();
    const [showTranslation, setShowTranslation] = useState(false);
    const { data: vocabList } = useVocab(auth.user?.uid ?? null)
    const vocab = vocabList?.find((vocabItem) => vocabItem.vocab === props.termTranslation.text || vocabItem.vocab === props.termTranslation.infinitive);
    const storyId = useContext(StoryIdContext);
    const onReadUsageEvent = useContext(OnReadUsageEvent);


    const handleClick = () => {
        setShowTranslation(true);
        onReadUsageEvent();
        posthog.capture("view_word_translation", {
            vocab: props.termTranslation.text,
            storyId: storyId,
        });
    }

    return (
        <span
            onClick={handleClick}
            onMouseLeave={() => setShowTranslation(false)}
            className="cursor-pointer relative mx-0.5 underline decoration-dotted hover:text-indigo-500 cursor-pointer">
            {showTranslation && <div className="cursor-text absolute bottom-0 left-0">
                <div className="bg-black whitespace-nowrap flex text-white rounded-lg p-2 items-start mb-6 mx-auto">
                    <div>
                        <p>
                            {props.termTranslation.translation}
                        </p>
                        {props.termTranslation.transliteration &&
                            <p className="text-sm italic mx-auto">
                                {props.termTranslation.transliteration}
                            </p>
                        }
                    </div>
                    <VocabSaveButton termTranslation={props.termTranslation} />
                </div>
            </div>}
            <span className={vocab ? "bg-cyan-100" : ""}>
            {props.termTranslation.text}
            </span>
        </span>

    );
}