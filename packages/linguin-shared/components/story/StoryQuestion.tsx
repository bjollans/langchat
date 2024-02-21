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
        <Div className="px-4 py-5 sm:p-6">
            <H3 className="mt-4 text-base font-semibold leading-6 text-gray-900">{props.storyQuestionData.question}</H3>
            <Div className="mt-4">
                {getAnswersInRandomOrder(props.storyQuestionData).map((option, i) => <_Options key={i} option={option} i={i} givenAnswer={givenAnswer} evaluateAnswer={evaluateAnswer} correctAnswer={props.storyQuestionData.correctAnswer} />)}
            </Div>
        </Div>

    )
}

function _Options({option, i, givenAnswer, evaluateAnswer, correctAnswer}) {
        const borderDefault = "divide-indigo-200 border border-indigo-200";
        const borderCorrect = "divide-green-500 border border-green-500";
        const borderIncorrect = "divide-red-500 border border-red-500";

        const answerIsCorrect = option == correctAnswer;
        const answerWasGiven = givenAnswer != null;
        const answerIsChoice = option == givenAnswer;
        const border = !answerWasGiven ? borderDefault
            : answerIsCorrect ? borderCorrect
                : answerIsChoice ? borderIncorrect : borderDefault;
        return (<Div>
            <Btn
                className={" text-sm text-gray-900 ring-2 ring-inset w-full mt-2 bg-slate-50 flex flex-row hover:bg-white"}
                onClick={() => evaluateAnswer(option)}
            >
                <Div className={border + " w-full flex flex-row grow-0 divide-x-2"}>
                    <P className="text-sm text-gray-900 px-3 py-2">{String.fromCharCode(i + 65)}</P>
                    <Div className="text-sm text-gray-900 px-3 py-2 shrink flex flex-row flex-wrap justify-between items-center w-full">
                        <Span>{option}</Span>
                        {answerWasGiven && answerIsCorrect &&
                            <Span className="text-xs text-green-500" >Correct Answer</Span>}
                        {answerWasGiven && answerIsChoice && !answerIsCorrect &&
                            <Span className="text-xs text-red-500" >Your Answer</Span>}
                    </Div>
                </Div>
            </Btn>
        </Div>);
}