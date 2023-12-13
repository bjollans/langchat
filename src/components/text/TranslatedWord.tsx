import VocabSaveButton from "components/vocab/VocabSaveButton";
import { TermTranslation } from "model/translations";
import { useState } from "react";
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


    return (
        <span
            onClick={() => setShowTranslation(true)}
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

    )
}