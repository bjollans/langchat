import { StoryFilterChangeCalls, StoryListFilterContext } from "context/storyListFilterContext";
import { StoryText } from "model/translations";
import { useContext } from "react";
import { useAuth } from "util/auth";
import { UserStoryStatistics, useUserStoryStatistics } from "util/userStatistics";
import StoryCompletedCheckMark from "./StoryCompletedCheckMark";

export interface StoryListElementProps {
    story: StoryText;
}

export default function StoryListElement(props: StoryListElementProps) {
    const auth = useAuth();
    const userStoryStatistics: UserStoryStatistics = useUserStoryStatistics({ userId: auth?.user?.id ?? null, storyId: props.story.id });
    const ageMs = new Date().getTime() - (new Date(props.story.createdAt).getTime());
    const ageDays = Math.floor(ageMs / (1000 * 60 * 60 * 24));
    const isNew: boolean = ageDays < 7;

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
                        <div className="flex space-x-2">
                            <p className="text-lg font-semibold leading-6 text-gray-900">{props.story.title}</p>
                            {isNew && <span className="inline-flex items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                New
                            </span>}
                        </div>
                        <div className="sm:flex items-end justify-between gap-x-8">
                            <div>
                                <ul className="flex space-x-2">
                                    <li className="mt-1 mr-1 truncate text-xs leading-5 bold text-gray-500">
                                        Words:
                                        <span className="mt-1 truncate text-xs leading-5 text-gray-400"> {props.story.wordCount}</span>
                                    </li>
                                    {!userStoryStatistics.hasRead && <li className="mt-1 mr-1 truncate text-xs leading-5 bold text-gray-500">
                                        New:
                                        <span className="mt-1 truncate text-xs leading-5 text-gray-400"> {userStoryStatistics.newWords} ({userStoryStatistics.newWordsPercentage}%)</span>
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