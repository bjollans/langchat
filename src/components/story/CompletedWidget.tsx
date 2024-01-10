import { TrophyIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import ConfettiExplosion from 'react-confetti-explosion';

export interface CompletedWidgetProps {
    isOpen: boolean;
    newWordCount: number;
    revisedWordCount: number;
}

export default function CompletedWidget(props: CompletedWidgetProps) {
    const [newWordCount, setNewWordCount] = useState(0);
    const [revisedWordCount, setRevisedWordCount] = useState(0);
    const [rowsShown, setRowsShown] = useState(0);
    const countUpTime = 1000;

    const newWordCountAnimation = () => {
        const interval = countUpTime / props.newWordCount;
        for (let i = 0; i <= props.newWordCount; i++) {
            setTimeout(() => {
                setNewWordCount(i);
                if (i == props.newWordCount) {
                    console.log("asdf1");
                    setRowsShown(rowsShown + 1);
                }
            }, interval * i);
        };
    }

    const revisedWordCountAnimation = () => {
        const interval = countUpTime / props.revisedWordCount;
        for (let i = 0; i <= props.revisedWordCount; i++) {
            setTimeout(() => {
                setRevisedWordCount(i);
                if (i == props.revisedWordCount) {
                    console.log("asdf2");
                    setRowsShown(rowsShown + 1);
                }
            }, interval * i + countUpTime);
        };
    }

    useEffect(() => {
        setNewWordCount(0);
        setRevisedWordCount(0);
        setRowsShown(1);
        newWordCountAnimation();
        revisedWordCountAnimation();
    }, [props.isOpen]);

    return (
        <div className="p-4">
            <ConfettiExplosion height={200} width={300} duration={1500}
            colors={['#a3e635', '#22d3ee', '#6366f1', '#fde047']}
            particleSize={6} particleCount={50} />
            <div className="flex items-center mb-2 text-lg tracking-tight font-semibold">
                <TrophyIcon className="h-5 w-5 mr-2 text-indigo-400" />
                <span>
                    Story Completed!
                </span>
            </div>
            <div className="tracking-tighter font-bold text-sm grid grid-cols-2 min-w-2/3 gap-x-2 justify-items-start">
                {/*
                    {rowsShown >= 1 && <span>New Words:</span>}
                    {rowsShown >= 1 && <span className="text-indigo-400">{newWordCount}</span>}
                    {rowsShown >= 2 && <span>Revised Words:</span>}
                    {rowsShown >= 2 && <span className="text-indigo-400">{revisedWordCount}</span>}
                */}
            </div>
        </div>
    );
}