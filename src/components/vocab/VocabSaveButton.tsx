import RequireAuthButton from "components/RequireAuthButton";
import { TermTranslation } from "model/translations";

import { BookmarkIcon as BookmarkIconOutline } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid";
import { TargetLanguageContext } from "context/targetLanguageContext";
import posthog from "posthog-js";
import { useContext } from "react";
import { useAuth } from "util/auth";
import { createVocab, updateVocab, useVocab } from "util/db";

interface VocabSaveButtonProps {
    termTranslation: TermTranslation;
}

export default function VocabSaveButton(props: VocabSaveButtonProps) {
    const auth = useAuth();
    const targetLanguage = useContext(TargetLanguageContext);
    const { data: vocabList } = useVocab(auth.user?.uid ?? null)
    const vocab = vocabList?.find((vocabItem) => vocabItem.vocab === props.termTranslation.text || vocabItem.vocab === props.termTranslation.infinitive);

    const handleVocabSaveClick = () => {
        posthog.capture("save_vocab_clicked");
        if (!auth.user) {
            posthog.capture("save_vocab_click_but_no_login");
            return;
        }
        if (vocab) {
            posthog.capture("save_vocab_clicked_delete");
            vocab.deleted = true;
            updateVocab(vocab);
        } else {
            posthog.capture("save_vocab_clicked_create");
            createVocab({
                userId: auth.user?.uid ?? null,
                vocab: props.termTranslation.infinitive ?? props.termTranslation.text,
                translation: props.termTranslation.infinitiveTranslation ?? props.termTranslation.translation!,
                transliteration: props.termTranslation.infinitiveTransliteration ?? props.termTranslation.transliteration!,
                targetLanguage: targetLanguage,
            });
        }
    };

    return (
        <RequireAuthButton
            onClick={handleVocabSaveClick}
            noAuthText="Login to save vocabulary"
            className="rounded-md ml-2 mt-1 bg-slate-100 p-1"
        >
            {vocab
                && <BookmarkIconSolid className="w-4 h-4 text-black" />
                || <BookmarkIconOutline className="w-4 h-4 text-black" />
            }
        </RequireAuthButton>);

}