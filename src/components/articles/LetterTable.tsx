import { ChevronDoubleDownIcon, ChevronDoubleRightIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import LetterAudioElement from "./LetterAudioElement";

export interface SoundInEnglish {
    start: string;
    sound: string;
    end: string;
}

export interface LetterExplanation {
    sign: string;
    sound: string;
    annotation?: string;
    soundInEnglish?: SoundInEnglish;
    note?: string | JSX.Element;
}


export interface LetterTableProps {
    letterExplanations: LetterExplanation[];
}


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function LetterTable(props: LetterTableProps) {
    const cellClass = "border p-2";

    const gridColCountList = [
        "grid-cols-1",
        "grid-cols-2",
        "grid-cols-3",
        "grid-cols-4",
        "grid-cols-5",
    ];

    const gridColCount = gridColCountList[Math.min(gridColCountList.length - 1, props.letterExplanations.length - 1)];

    return (
        <div className="">
            {props.letterExplanations && props.letterExplanations.length > 0 &&
                <div className={`grid ${gridColCount}  mx-auto table-auto border-spacing-2 border border-gray-400 mt-4`}>
                    {props.letterExplanations.map((letterExplanation) => (
                        <div className={classNames(cellClass)}>
                            <span className="flex flex-col items-center">
                                <span className="text-2xl">
                                    <LetterAudioElement letter={letterExplanation.sign} />
                                </span>
                                <span className="text-lg"> ({letterExplanation.sound})</span>
                                {letterExplanation.soundInEnglish &&
                                    <span className="italic">
                                        {letterExplanation.soundInEnglish.start}{letterExplanation.soundInEnglish.sound && <span className="font-bold not-italic mx-px">{letterExplanation.soundInEnglish.sound}</span>}{letterExplanation.soundInEnglish.end}
                                    </span>}
                                {letterExplanation.annotation &&
                                    <span className="italic">
                                        {letterExplanation.annotation}
                                    </span>}
                            </span>
                        </div>
                    ))}
                </div>}
            {props.letterExplanations.filter(x => x.note).length > 0 &&
                <div className=" p-3">
                    <h2 className="text-2xl font-bold text-center">Notes</h2>
                    {<ul className="list-disc pl-12">
                        {props.letterExplanations.filter(x => x.note).map((letterExplanation) => (
                            <li className="mt-2">
                                {letterExplanation.sign} - {letterExplanation.note}
                            </li>
                        ))}
                    </ul>}</div>}
        </div>
    );
}