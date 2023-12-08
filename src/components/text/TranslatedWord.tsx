import { BookmarkIcon as BookmarkIconOutline } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid";
import TooltipButton from "components/TooltipButton";
import { TargetLanguageContext } from "context/targetLanguageContext";
import { useContext, useState } from "react";
import { Language } from "types/language";
import { useAuth } from "util/auth";
import { createVocab, useVocab } from "util/db";

export interface TranslatedTermProps {
    term: string;
    translation: string | undefined;
    transliteration: string | undefined;
}

export default function TranslatedTerm(props: TranslatedTermProps): JSX.Element {
    const auth = useAuth();
    const targetLanguage = useContext(TargetLanguageContext);
    const [showTranslation, setShowTranslation] = useState(false);
    const { data: vocabList } = useVocab(auth.user?.uid ?? null)
    const vocab = vocabList?.find((vocabItem) => vocabItem.vocab === props.term);

    const handleVocabSaveClick = () => {
        if (!auth.user) return;
        if (vocab) {
            vocab.deleted = true;
        } else {
            createVocab({
                userId: auth.user?.uid ?? null,
                vocab: props.term,
                translation: props.translation!,
                transliteration: props.transliteration,
                targetLanguage: targetLanguage,
            });
        }
    };




    return (
        <span
            onClick={() => setShowTranslation(true)}
            onMouseLeave={() => setShowTranslation(false)}
            className="cursor-pointer relative mx-0.5 underline decoration-dotted hover:text-indigo-500 cursor-pointer">
            {showTranslation && <div className="cursor-text absolute bottom-0 left-0">
                <div className="bg-black whitespace-nowrap flex text-white rounded-lg p-2 items-start mb-6 mx-auto">
                    <div>
                        <p>
                            {props.translation}
                        </p>
                        {props.transliteration &&
                            <p className="text-sm italic mx-auto">
                                {props.transliteration}
                            </p>
                        }
                    </div>
                    <TooltipButton
                        disabled={!(auth.user)}
                        onClick={handleVocabSaveClick}
                        disabledTooltip="Login to save vocabulary"
                        disabledClassName="bg-slate-600"
                        className="rounded-md ml-2 mt-1 bg-slate-100 p-1"
                    >
                        {vocab
                            && <BookmarkIconSolid className="w-4 h-4 text-black" />
                            || <BookmarkIconOutline className="w-4 h-4 text-black" />
                        }
                    </TooltipButton>
                </div>
            </div>}
            {props.term}
        </span>

    )
}