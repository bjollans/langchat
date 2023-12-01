import { TranslatedText, TermTranslation } from "model/translations";
import TranslatedTerm from "./TranslatedWord";
import { useState } from "react";
import { LanguageIcon } from '@heroicons/react/24/solid'

interface TranslatedTextProps {
    translatedText: TranslatedText;
}

export default function TranslatedTextRender(props: TranslatedTextProps): JSX.Element {
    const [showWholeTranslation, setShowWholeTranslation] = useState(false);
    const translatedWords: Array<JSX.Element> = [];

    for (var i = 0; i < props.translatedText?.content.length ?? 0; i++) {
        const termAtThisPosition = props.translatedText.translationJson?.terms.filter((termTranslation: TermTranslation) =>
            termTranslation.position <= i && termTranslation.position + termTranslation.text.length > i
        )
        if (termAtThisPosition && termAtThisPosition.length > 0) {
            translatedWords.push((<TranslatedTerm
                term={termAtThisPosition[0].text}
                translation={termAtThisPosition[0].translation}
                transliteration={termAtThisPosition[0].transliteration} />));
            i = termAtThisPosition[0].position + termAtThisPosition[0].text.length - 1;
        }
        else {
            translatedWords.push(<span>{props.translatedText.content[i]}</span>);
        }
    }

    return (<>
        <span className="relative cursor-pointer"
            onMouseLeave={() => setShowWholeTranslation(false)}>
            <div className={showWholeTranslation ? "cursor-text absolute bottom-0 left-0 z-50" : "hidden"}>
                <div className="bg-black text-white rounded-lg p-2 mb-6 w-96 max-w-full mx-auto">
                    <p className="flex">
                        {props.translatedText.translationJson?.wholeSentence?.translation}
                    </p>
                    {props.translatedText.translationJson?.wholeSentence?.transliteration &&
                        <p className="text-sm flex italic mx-auto">
                            {props.translatedText.translationJson?.wholeSentence?.transliteration}
                        </p>
                    }
                </div>
            </div>
            <div className={`flex flex-wrap text-2xl`}>
                {translatedWords}
                <button className="hover:bg-slate-200 text-black font-bold py-2 px-2 mx-4 rounded" onClick={() => setShowWholeTranslation(true)}>
                    <LanguageIcon className="h-5 w-5" aria-hidden="true" />
                </button>
            </div>
        </span>
    </>
    );
}