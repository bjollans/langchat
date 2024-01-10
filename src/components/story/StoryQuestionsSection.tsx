import { useAuth } from "util/auth";
import { markUserStoryRead, useStoryQuestions, useUserHasReadStory } from "util/db";
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
    const questionAmount = 1;
    const auth = useAuth();
    const { data: storyQuestions, isSuccess } = useStoryQuestions(props.storyId);
    const { data: storyReadData } = useUserHasReadStory(props.storyId, auth?.user?.id ?? null);
    const hasUserAlreadyReadStory: boolean = storyReadData !== undefined && storyReadData[0] !== undefined;
    const [triedQuestionIndices, setTriedQuestionIndices] = useState<Array<number>>([]);
    const [currentQuestionIndices, setCurrentQuestionIndices] = useState<Array<number>>(_.range(questionAmount));
    const [answeredCorrectlyByIndex, setAnsweredCorrectlyByIndex] = useState<Array<boolean>>(_.range(questionAmount).map(() => false));
    const [attemptedCount, setAttemptedCount] = useState<number>(0);
    const answeredCorrectlyCount = answeredCorrectlyByIndex.filter((isCorrect) => isCorrect).length;
    const answeredAllCorrectly = answeredCorrectlyCount >= questionAmount;


    useEffect(() => {
        newQuestionIndex();
    }, [storyQuestions]);

    useEffect(() => {
        if (answeredAllCorrectly && auth?.user?.id) {
            markUserStoryRead(props.storyId, auth?.user?.id);
        }
    }, [answeredCorrectlyByIndex]);

    const newQuestionIndex = () => {
        if (!isSuccess || storyQuestions == undefined) return;
        if (storyQuestions?.length - triedQuestionIndices.length <= 1) {
            setTriedQuestionIndices([]);
        }
        const untriedQuestionIndices = _.range(storyQuestions!.length).filter((i: number) => !(i in triedQuestionIndices) && !(i in currentQuestionIndices));
        const randomlySelectedIndices = _.sampleSize(untriedQuestionIndices, questionAmount);
        setCurrentQuestionIndices(randomlySelectedIndices);
    }

    const incrementAttemptedCount = () => {
        setAttemptedCount(attemptedCount + 1);
    }

    const getOnAnswerFunction = (questionIndex: number) => (answeredCorrectly: boolean) => {
        if (answeredCorrectly) {
            const newAnsweredCorrectly = [...answeredCorrectlyByIndex];
            newAnsweredCorrectly[questionIndex] = true;
            setAnsweredCorrectlyByIndex(newAnsweredCorrectly);
        }
        incrementAttemptedCount();
    }

    const resetQuestions = () => {
        setAnsweredCorrectlyByIndex(_.range(questionAmount).map(() => false));
        setAttemptedCount(0);
        setTriedQuestionIndices([...triedQuestionIndices, ...currentQuestionIndices]);
        newQuestionIndex();
    }

    const tryAgainButton = <button
        className="hover:bg-indigo-100 text-gray-900 py-2 px-4 border border-indigo-400 rounded shadow flex items-center text-sm text-indigo-400 tracking-wide"
        onClick={resetQuestions}
    >
        <ArrowPathIcon className="h-5 w-5 mr-2 text-indigo-400" /> Try Again
    </button>;

    return isSuccess && (storyQuestions.length > 0 || hasUserAlreadyReadStory)
        ? (
            <div className="flex items-center border-t justify-center items-baseline gap-x-2 mt-12">
                <div className="flex-col flex place-items-center sm:rounded-lg lg:px-24 sm:px-12 px-4 py-4 max-w-2xl">
                    {(!hasUserAlreadyReadStory || answeredAllCorrectly) &&
                        (<>
                            <div className="mt-1 max-w-xl text-md text-gray-500">
                                <p>Answer this correctly to mark the story as complete!</p>
                            </div>
                            {currentQuestionIndices.map((questionIndex: number) => (
                                <StoryQuestion
                                    storyQuestionData={storyQuestions[questionIndex]}
                                    onAnswer={getOnAnswerFunction(questionIndex)}
                                />
                            ))}
                        </>)
                    }
                    {attemptedCount > answeredCorrectlyCount && tryAgainButton}
                    {(answeredAllCorrectly || hasUserAlreadyReadStory) &&
                        <CompletedWidget isOpen={answeredAllCorrectly || hasUserAlreadyReadStory}
                            animateSuccess={!!answeredAllCorrectly}
                            newWordCount={150} revisedWordCount={200} />}
                </div>
            </div>)
        : <div>...loading</div>
        ;
}