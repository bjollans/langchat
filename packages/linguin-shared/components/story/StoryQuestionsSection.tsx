import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useAuth } from "linguin-shared/util/auth";
import { markUserStoryRead, markUserStoryReadAutomatic, upsertUserReadStatistics, useStoryQuestions } from "linguin-shared/util/clientDb";
import { UserReadStatistics, UserStoryStatistics, useUpdatedUserReadStatistics, useUserStoryStatistics } from "linguin-shared/util/userStatistics";
import CompletedWidget from "./CompletedWidget";
import StoryQuestion from "./StoryQuestion";
import { P, Div, SingleLayerBtn, Span } from "linguin-shared/components/RnTwComponents";
import Svg, { Path } from "react-native-svg";
import { Platform } from "react-native";
var _ = require('lodash');
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons/faArrowsRotate'
import { trackStat } from "linguin-shared/util/storyStatistics";
import usePostHog from 'linguin-shared/util/usePostHog';
import { useTargetLanguageContext } from "linguin-shared/context/targetLanguageContext";


export interface StoryQuestionsSectionProps {
    storyId: string;
}

export default function StoryQuestionsSection(props: StoryQuestionsSectionProps) {
    const QUESTION_AMOUNT = 1;

    const posthogClient = usePostHog();
    const auth = useAuth();
    const { data: storyQuestions, isSuccess } = useStoryQuestions(props.storyId);
    const userStoryStatistics: UserStoryStatistics = useUserStoryStatistics({ userId: auth?.user?.id ?? null, storyId: props.storyId, isInSingleStoryContext: true });
    const updatedUserReadStatistics: UserReadStatistics = useUpdatedUserReadStatistics(auth?.user?.id ?? null, props.storyId);
    const { userProfile } = useTargetLanguageContext();

    const [triedQuestionIndices, setTriedQuestionIndices] = useState<Array<number>>([]);
    const [currentQuestionIndices, setCurrentQuestionIndices] = useState<Array<number>>(_.range(QUESTION_AMOUNT));
    const [answeredCorrectlyByIndex, setAnsweredCorrectlyByIndex] = useState<Array<boolean>>(_.range(QUESTION_AMOUNT).map(() => false));
    const [attemptedCount, setAttemptedCount] = useState<number>(0);

    const answeredCorrectlyCount = answeredCorrectlyByIndex.filter((isCorrect) => isCorrect).length;
    const answeredAllCorrectly = answeredCorrectlyCount >= QUESTION_AMOUNT;

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
        const randomlySelectedIndices = _.sampleSize(untriedQuestionIndices, QUESTION_AMOUNT);
        setCurrentQuestionIndices(randomlySelectedIndices);
    }

    const incrementAttemptedCount = () => {
        setAttemptedCount(attemptedCount + 1);
    }

    const getOnAnswerFunction = (questionIndex: number) => async (answeredCorrectly: boolean) => {
        if (answeredCorrectly) {
            const newAnsweredCorrectly = [...answeredCorrectlyByIndex];
            newAnsweredCorrectly[questionIndex] = true;
            setAnsweredCorrectlyByIndex(newAnsweredCorrectly);
            await upsertUserReadStatistics(auth!.user!.id, userProfile.targetLanguage, updatedUserReadStatistics);
            await markUserStoryReadAutomatic(props.storyId, auth?.user?.uid ?? null);
            await trackStat(props.storyId, "completes")
            posthogClient?.capture('story_read', {
                story_id: props.storyId
            });
            posthogClient?.capture('story_question_answered_correctly', {
                story_id: props.storyId,
                story_title: storyQuestions![questionIndex].question,
                story_target_language: storyQuestions![questionIndex].correctAnswer,
            });
        } else {
            posthogClient?.capture('story_question_answered_incorrectly', {
                story_id: props.storyId,
                story_title: storyQuestions![questionIndex].question,
                story_target_language: storyQuestions![questionIndex].correctAnswer,
            });
        }
        incrementAttemptedCount();
    }

    const resetQuestions = () => {
        setAnsweredCorrectlyByIndex(_.range(QUESTION_AMOUNT).map(() => false));
        setAttemptedCount(0);
        setTriedQuestionIndices([...triedQuestionIndices, ...currentQuestionIndices]);
        newQuestionIndex();
    }

    const tryAgainButton = <SingleLayerBtn
        className="py-2 px-4 border border-indigo-400 rounded shadow flex flex-row text-sm text-indigo-400 tracking-wide hover:bg-indigo-100  justify-center items-center shrink self-center block"
        onClick={resetQuestions}
    >
        <Span className="text-indigo-400 text-md tracking-wide">Try Again</Span>
    </SingleLayerBtn>;

    return isSuccess && (storyQuestions.length > 0 || userStoryStatistics.hasRead)
        ? (
            <Div className="flex items-center border-t justify-center items-baseline gap-x-2 mt-12">
                <Div className="flex-col flex place-items-center sm:rounded-lg lg:px-24 sm:px-12 px-4 py-4 max-w-2xl w-full">
                    {(!userStoryStatistics.hasRead || answeredAllCorrectly) &&
                        (<>
                            <Div className="mt-1 max-w-xl text-lg text-gray-500">
                                <P>Answer this correctly to mark the story as complete!</P>
                            </Div>
                            {currentQuestionIndices.map((questionIndex: number) => (
                                <StoryQuestion
                                    storyQuestionData={storyQuestions[questionIndex]}
                                    onAnswer={getOnAnswerFunction(questionIndex)}
                                />
                            ))}
                        </>)
                    }
                    {attemptedCount > answeredCorrectlyCount && tryAgainButton}
                    {(answeredAllCorrectly || userStoryStatistics.hasRead) &&
                        <CompletedWidget isOpen={answeredAllCorrectly || userStoryStatistics.hasRead}
                            animateSuccess={!!answeredAllCorrectly}
                            newWordCount={userStoryStatistics.newWords} revisedWordCount={userStoryStatistics.knownWords} />}
                </Div>
            </Div>)
        : <P>...loading</P>
        ;
}


export function _RefreshIcon() {
    return Platform.OS == "web"
        ? <ArrowPathIcon className="h-5 w-5 mr-2 text-indigo-400" />
        : <FontAwesomeIcon icon={faArrowsRotate} size={12} color="#818cf8" />;
}