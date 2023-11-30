import { useState } from "react";

export interface TranslatedTermProps {
    term: string;
    translation: string | undefined;
    transliteration: string | undefined;
}

export default function TranslatedTerm(props: TranslatedTermProps): JSX.Element {
    const [showTranslation, setShowTranslation] = useState(false);

    return (
        <span className="relative cursor-pointer"
            onClick={() => setShowTranslation(true)}
            onMouseLeave={() => setShowTranslation(false)}>
            <div className={showTranslation ? "cursor-text absolute bottom-0 left-0" : "hidden"}>
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
            </div>
            <span className="mx-0.5 underline decoration-dotted hover:text-blue-500 cursor-pointer">
                {props.term}
            </span>
        </span>
    )
}