import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Vocab } from "model/vocab";
import React, { useEffect, useState } from "react";
import { updateVocab } from "util/db";

export interface FlashCardProps {
    vocab: Vocab;
}

export default function FlashCard(props: FlashCardProps) {
    const [flipped, setFlipped] = useState(false);
    if (!props.vocab) return null;

    function handleClick() {
        setFlipped(!flipped);
    }

    async function handleEvaluate(isCorrect: boolean) {
        props.vocab.lastPracticed = new Date();
        props.vocab.currentLeitnerBoxNumber! += isCorrect ? 1 : -2;
        if ((props.vocab.currentLeitnerBoxNumber!) < 0) props.vocab.currentLeitnerBoxNumber = 0;
        props.vocab.timesPracticed! += 1;
        props.vocab.timesCorrect! += isCorrect ? 1 : 0;
        await updateVocab(props.vocab);
    }

    useEffect(() => {
        setFlipped(false);
    }, [props.vocab]);

    return (
        <div>
            <div className="flex justify-center mt-8">
                <div className="border mx-8 align-center max-w-xs w-full flex items-center justify-center p-12 shadow-md"
                    onClick={handleClick}>
                    {flipped
                        ? props.vocab.translation + (
                            props.vocab.transliteration
                                ? ` (${props.vocab.transliteration})`
                                : ""
                        )
                        : props.vocab.vocab
                    }
                </div>
            </div>
            <div className="flex">
                {flipped
                    && <div className="mx-auto flex gap-x-2">
                        <button className="mx-auto mt-4 hover:bg-red-200 text-red-600 border border-red-600 font-bold py-2 px-4 rounded"
                            onClick={() => handleEvaluate(false)}>
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                        <button className="mx-auto mt-4 hover:bg-green-200 text-green-600 border border-green-600 font-bold py-2 px-4 rounded"
                            onClick={() => handleEvaluate(true)}>
                            <CheckIcon className="h-5 w-5" />
                        </button>
                    </div>
                    || <p className="mt-4 text-black mx-auto font-light italic text-sm py-2 px-4 rounded"
                        onClick={() => setFlipped(true)}>
                        Click card to see answer
                    </p>
                }
            </div>
        </div>
    );
}
