import { TrophyIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import ConfettiExplosion from 'react-confetti-explosion';
import { Platform } from "react-native";
import { Div, Span } from "linguin-shared/components/RnTwComponents";
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

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
        <Div className="p-4">
            {props.animateSuccess && Platform.OS == "web" && <ConfettiExplosion height={200} width={300} duration={1500}
                colors={['#a3e635', '#22d3ee', '#6366f1', '#fde047']}
                particleSize={6} particleCount={50} />}
            <Div className="flex items-center mb-2 text-lg tracking-tight font-semibold">
                <_TrophyIcon />
                <Span>
                    Story Completed!
                </Span>
            </Div>
            {props.animateSuccess && <Div className="tracking-tighter font-bold text-sm grid grid-cols-2 min-w-2/3 gap-x-2 justify-items-start">
                {rowsShown >= 1 && <Span>New Words:</Span>}
                {rowsShown >= 1 && <Span className="text-indigo-400">{newWordDisplayCount}</Span>}
                {rowsShown >= 2 && <Span>Revised Words:</Span>}
                {rowsShown >= 2 && <Span className="text-indigo-400">{revisedWordDisplayCount}</Span>}
            </Div>}
        </Div>
    );
}

function _TrophyIcon() {
    if (Platform.OS == "web") {
        return <TrophyIcon className="h-5 w-5 mr-2 text-indigo-400" />
    }
    return <Icon name="trophy" size={24} color="#6366f1" />
}