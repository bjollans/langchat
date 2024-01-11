import { StoryFilterChangeCalls, StoryListFilterContext } from "context/storyListFilterContext";
import { StoryText } from "model/translations";
import { useContext, useEffect, useState } from "react";
import StoryCompletedCheckMark from "./StoryCompletedCheckMark";
import { useAuth } from "util/auth";
import { useUserHasReadStory, userWordsSeen } from "util/db";

export interface StoryListElementProps {
    story: StoryText;
}

export default function StoryListElement(props: StoryListElementProps) {
    const auth = useAuth();
    const { data: storyReadData } = useUserHasReadStory(props.story.id, auth?.user?.id ?? null);
    const storyRead: boolean = storyReadData !== undefined && storyReadData[0];
    const { data: wordsSeenJson } = userWordsSeen(auth?.user?.uid);
    const wordsSeen = wordsSeenJson?.length > 0 ? wordsSeenJson[0]?.wordsSeen : [];

    const [storyNewWordsPercentage, setStoryNewWordsPercentage] = useState<number>(0);
    const [storyNewWordsCount, setStoryNewWordsCount] = useState<number>(0);
    const [storyKnownWordsCount, setStoryKnownWordsCount] = useState<number>(0);

    useEffect(() => {
        const wordsSeenSet = new Set(wordsSeen);
        const wordsInStory = props.story.wordsInStory ?? [];
        let newWordsCount = 0;
        let knownWordsCount = 0;

        wordsInStory.forEach((word: string) => {
            if (wordsSeenSet.has(word)) {
                knownWordsCount++;
            } else {
                newWordsCount++;
            }
        });

        setStoryNewWordsCount(newWordsCount);
        setStoryNewWordsPercentage(Math.floor(100 * newWordsCount / props.story.wordCount));
        setStoryKnownWordsCount(knownWordsCount);
    }, [wordsSeen]);

    const difficultyColor = {
        "easy": "ring-green-600/20 bg-green-50 text-green-700",
        "intermediate": "ring-blue-700/10 bg-blue-50 text-blue-700",
        "hard": "ring-purple-700/10 bg-purple-50 text-purple-700",
    }

    const storyFilterChangeCalls: StoryFilterChangeCalls | undefined = useContext(StoryListFilterContext);

    return (
        <a href={`/story/hi/${props.story.id}`} className="w-full h-full">
            <li key={props.story.title} className="flex px-4 gap-x-4 py-5 hover:bg-slate-100 items-center">
                <img className="w-24 flex-none rounded-full bg-gray-50" src={props.story.previewImageUrl} alt="" />
                <div>
                    <div className="min-w-0">
                        <p className="text-lg font-semibold leading-6 text-gray-900">{props.story.title}</p>
                        <div className="sm:flex items-end justify-between gap-x-8">
                            <div>
                                <ul className="flex space-x-2">
                                    <li className="mt-1 mr-1 truncate text-xs leading-5 bold text-gray-500">
                                        Words: 
                                        <span className="mt-1 truncate text-xs leading-5 text-gray-400"> {props.story.wordCount}</span>
                                    </li>
                                    {!storyRead && <li className="mt-1 mr-1 truncate text-xs leading-5 bold text-gray-500">
                                        New: 
                                        <span className="mt-1 truncate text-xs leading-5 text-gray-400"> {storyNewWordsCount} ({storyNewWordsPercentage}%)</span>
                                    </li>}
                                </ul>
                                <p className="mt-1 truncate italic text-xs leading-5 text-gray-400">{props.story.content.slice(0, 30) + '....'}</p>
                            </div>
                            <StoryCompletedCheckMark storyId={props.story.id} />
                        </div>
                    </div>
                    <div className="flex mt-4 text-sm leading-5 text-gray-500">
                        <button key={`${props.story.id}-difficulty`}
                            className={"mr-2 inline-flex items-center rounded-full px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset "
                                + difficultyColor[props.story.difficulty.toLowerCase()]}
                            onClick={(e) => {
                                e.preventDefault();
                                if (storyFilterChangeCalls!.difficulties.includes(props.story.difficulty)) {
                                    storyFilterChangeCalls!.onDifficultyRemove(props.story.difficulty);
                                    return;
                                }
                                storyFilterChangeCalls!.onDifficultyAdd(props.story.difficulty);
                            }}
                        >
                            {props.story.difficulty}
                        </button>
                        {props.story.collections?.map((collectionName: any) => <button key={props.story.title + collectionName}
                            className="mr-2 inline-flex items-center rounded-full bg-gray-50 px-1.5 py-0.5 text-xs font-medium text-gray-500 ring-1 ring-inset ring-gray-500/10"
                            onClick={(e) => {
                                e.preventDefault();
                                if (storyFilterChangeCalls!.collections.includes(collectionName)) {
                                    storyFilterChangeCalls!.onCollectionRemove(collectionName);
                                    return;
                                }
                                storyFilterChangeCalls!.onCollectionAdd(collectionName);
                            }}>
                            {collectionName}
                        </button>)}
                    </div>
                </div>
            </li>
        </a>
    );
}