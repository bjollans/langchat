import { TrophyIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import ConfettiExplosion from 'react-confetti-explosion';

export interface CompletedWidgetProps {
    isOpen: boolean;
    newWordCount: number;
    revisedWordCount: number;
    animateSuccess: boolean;
}

export default function CompletedWidget(props: CompletedWidgetProps) {
    const [newWordDisplayCount, setNewWordDisplayCount] = useState(0);
    const [revisedWordDisplayCount, setRevisedWordDisplayCount] = useState(0);
    const [rowsShown, setRowsShown] = useState(1);
    const countUpTime = 1000;

    const newWordCountAnimation = () => {
        const interval = countUpTime / props.newWordCount;
        for (let i = 0; i <= props.newWordCount; i++) {
            setTimeout(() => {
                setNewWordDisplayCount(i);
                if (i == props.newWordCount) {
                    setRowsShown(rowsShown + 1);
                }
            }, interval * i);
        };
    }

    const revisedWordCountAnimation = () => {
        const interval = countUpTime / props.revisedWordCount;
        for (let i = 0; i <= props.revisedWordCount; i++) {
            setTimeout(() => {
                setRevisedWordDisplayCount(i);
                if (i == props.revisedWordCount) {
                    setRowsShown(rowsShown + 1);
                }
            }, interval * i + countUpTime);
        };
    }

    useEffect(() => {
        setNewWordDisplayCount(0);
        setRevisedWordDisplayCount(0);
        setRowsShown(1);
        newWordCountAnimation();
        revisedWordCountAnimation();
    }, [props.isOpen]);

    return (
        <div className="p-4">
            {props.animateSuccess && <ConfettiExplosion height={200} width={300} duration={1500}
                colors={['#a3e635', '#22d3ee', '#6366f1', '#fde047']}
                particleSize={6} particleCount={50} />}
            <div className="flex items-center mb-2 text-lg tracking-tight font-semibold">
                <TrophyIcon className="h-5 w-5 mr-2 text-indigo-400" />
                <span>
                    Story Completed!
                </span>
            </div>
            {props.animateSuccess && <div className="tracking-tighter font-bold text-sm grid grid-cols-2 min-w-2/3 gap-x-2 justify-items-start">
                {rowsShown >= 1 && <span>New Words:</span>}
                {rowsShown >= 1 && <span className="text-indigo-400">{newWordDisplayCount}</span>}
                {rowsShown >= 2 && <span>Revised Words:</span>}
                {rowsShown >= 2 && <span className="text-indigo-400">{revisedWordDisplayCount}</span>}
            </div>}
        </div>
    );
}