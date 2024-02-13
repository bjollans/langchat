import { StoryQuestionData } from "model/translations";
import { useEffect, useState } from "react";
import { P, Div, Btn, Span, H3 } from "linguin-shared/components/RnTwComponents";

export interface StoryQuestionProps {
    storyQuestionData: StoryQuestionData;
    onAnswer: (answeredCorrectly: boolean) => void;
}

export default function StoryQuestion(props: StoryQuestionProps) {
    const [givenAnswer, setGivenAnswer] = useState<string | null>(null);

    useEffect(() => {
        setGivenAnswer(null);
    }, [props.storyQuestionData]);

    const evaluateAnswer = (answer: string) => {
        if (givenAnswer != null) return;
        setGivenAnswer(answer);
        props.onAnswer(answer == props.storyQuestionData.correctAnswer);
    }

    const getAnswersInRandomOrder = (storyQuestion: any) => {
        const answers = [storyQuestion.correctAnswer, ...storyQuestion.otherOptions];
        const predictableRandomNumber = (s: string) => {
            let hash = 0;
            if (s.length === 0) return hash;
            for (let i = 0; i < s.length; i++) {
                hash = s.charCodeAt(i) + ((hash << 5) - hash);
                hash = hash & hash;
            }
            return hash;
        }
        return answers.sort((a, b) => predictableRandomNumber(a) - predictableRandomNumber(b));
    }

    return (
        <Div className="px-4 py-5 sm:p-6 w-full">
            <H3 className="mt-4 text-base font-semibold leading-6 text-gray-900">{props.storyQuestionData.question}</H3>
            <Div className="mt-4">
                {getAnswersInRandomOrder(props.storyQuestionData).map((option, i) => {
                    const borderDefault = "divide-indigo-200 ring-inset ring-indigo-200";
                    const borderCorrect = "divide-green-500 ring-inset ring-green-500";
                    const borderIncorrect = "divide-red-500 ring-inset ring-red-500";

                    const answerIsCorrect = option == props.storyQuestionData.correctAnswer;
                    const answerWasGiven = givenAnswer != null;
                    const answerIsChoice = option == givenAnswer;
                    const border = !answerWasGiven ? borderDefault
                        : answerIsCorrect ? borderCorrect
                            : answerIsChoice ? borderIncorrect : borderDefault;
                    return (<Div>
                        <Btn
                            className={border + " text-sm text-gray-900 ring-2 ring-inset w-full mt-2 rounded-md bg-slate-50 flex hover:bg-white"}
                            onClick={() => evaluateAnswer(option)}
                        >
                            <Div className="flex divide-x-2">
                                <P className="text-sm text-gray-900 px-3 py-2 h-full">{String.fromCharCode(i + 65)}</P>
                                <P className="text-sm text-gray-900 px-3 py-2 flex justify-between w-full items-center">{option}
                                    {answerWasGiven && answerIsCorrect &&
                                        <Span className="text-xs text-green-500" >Correct Answer</Span>}
                                    {answerWasGiven && answerIsChoice && !answerIsCorrect &&
                                        <Span className="text-xs text-red-500" >Your Answer</Span>}
                                </P>
                            </Div>
                        </Btn>
                    </Div>);
                })}
            </Div>
        </Div>

    )
}