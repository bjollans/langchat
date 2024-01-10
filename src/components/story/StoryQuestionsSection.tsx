import { useAuth } from "util/auth";
import { useStoryQuestions } from "util/db";
import StoryQuestion from "./StoryQuestion";
import { ArrowPathIcon, TrophyIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import CompletedWidget from "./CompletedWidget";
var _ = require('lodash');


export interface StoryQuestionsSectionProps {
    storyId: string;
}

export default function StoryQuestionsSection(props: StoryQuestionsSectionProps) {
    const auth = useAuth();
    const { data: storyQuestions, isSuccess } = useStoryQuestions(props.storyId);
    const [triedQuestionIndices, setTriedQuestionIndices] = useState<Array<number>>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean | null>(null);
    const [isComplete, setIsComplete] = useState(false);


    useEffect(() => {
        newQuestionIndex();
    }, [storyQuestions]);

    const newQuestionIndex = () => {
        if (!isSuccess || storyQuestions == undefined) return;
        if (storyQuestions?.length - triedQuestionIndices.length <= 1) {
            setTriedQuestionIndices([]);
        }
        const untriedQuestionIndices = _.range(storyQuestions!.length).filter((i: number) => !(i in triedQuestionIndices) && i != currentQuestionIndex);
        console.log(untriedQuestionIndices);
        const randomIndex = untriedQuestionIndices[Math.floor(Math.random() * untriedQuestionIndices.length)];
        setCurrentQuestionIndex(randomIndex);
    }

    const onAnswer = (answeredCorrectly: boolean) => {
        setAnsweredCorrectly(answeredCorrectly);
    }

    const resetQuestion = () => {
        setAnsweredCorrectly(null);
        setTriedQuestionIndices([...triedQuestionIndices, currentQuestionIndex]);
        newQuestionIndex();
    }

    const tryAgainButton = <button
        className="hover:bg-indigo-100 text-gray-900 py-2 px-4 border border-indigo-400 rounded shadow flex items-center text-sm text-indigo-400 tracking-wide"
        onClick={resetQuestion}
    >
        <ArrowPathIcon className="h-5 w-5 mr-2 text-indigo-400" /> Try Again
    </button>;

    const completeButton = <button
        className="hover:bg-indigo-100 text-gray-900 py-2 px-4 border border-indigo-400 rounded shadow flex items-center text-sm text-indigo-400 tracking-wide"
        onClick={() => { setIsComplete(!isComplete); }}
    >
        ...
    </button>;

    console.log(currentQuestionIndex);

    return isSuccess && storyQuestions.length > 0
        ? (
            <div className="flex items-center border-t justify-center items-baseline gap-x-2 mt-12">
                <div className="flex-col flex place-items-center sm:rounded-lg lg:px-24 sm:px-12 px-4 py-4">
                        <StoryQuestion storyQuestionData={storyQuestions[currentQuestionIndex]} onAnswer={onAnswer} />
                    {answeredCorrectly != null && !answeredCorrectly && tryAgainButton}
                    {answeredCorrectly &&
                    <CompletedWidget isOpen={answeredCorrectly} newWordCount={150} revisedWordCount={200} />}
                </div>
            </div>)
        : <div>...loading</div>
        ;
}