import { useState } from "react";

export interface TranslatedTermProps {
    term: string;
    translation: string | undefined;
    transliteration: string | undefined;
}

export default function TranslatedTerm(props: TranslatedTermProps): JSX.Element {
    const [showTranslation, setShowTranslation] = useState(false);

    return (
        <span
            onClick={() => setShowTranslation(true)}
            onMouseLeave={() => setShowTranslation(false)}
            className="cursor-pointer relative mx-0.5 underline decoration-dotted hover:text-indigo-500 cursor-pointer">
            {showTranslation && <div className="cursor-text absolute bottom-0 left-0">
                <div className="bg-black whitespace-nowrap text-white rounded-lg p-2 mb-6 mx-auto">
                    <p>
                        {props.translation}
                    </p>
                    {props.transliteration &&
                        <p className="text-sm italic mx-auto">
                            {props.transliteration}
                        </p>
                    }
                </div>
            </div>}
            {props.term}
        </span>

    )
}