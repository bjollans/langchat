import { StoryFilterChangeCalls, StoryListFilterContext } from "linguin-shared/context/storyListFilterContext";
import { StoryText } from "linguin-shared/model/translations";
import { useContext, useEffect } from "react";
import { useAuth } from "linguin-shared/util/auth";
import { UserStoryStatistics, useUserStoryStatistics } from "linguin-shared/util/userStatistics";
import StoryCompletedCheckMark from "./StoryCompletedCheckMark";
import { useInView } from 'react-intersection-observer';
import { trackStat } from "linguin-shared/util/storyStatistics";
import { Div, Span, P, Btn, Img } from "linguin-shared/components/RnTwComponents";
import { Platform } from "react-native";

export interface StoryListElementProps {
    story: StoryText;
}

export default function StoryListElement(props: StoryListElementProps) {
    const auth = useAuth();
    const userStoryStatistics: UserStoryStatistics = useUserStoryStatistics({ userId: auth?.user?.id ?? null, storyId: props.story.id });
    const ageMs = new Date().getTime() - (new Date(props.story.createdAt).getTime());
    const ageDays = Math.floor(ageMs / (1000 * 60 * 60 * 24));
    const isNew: boolean = ageDays < 7;

    const [visibilityRef, hasBeenSeen] = useInView({
        threshold: 0.5,
        triggerOnce: true,
        delay: 1000,
    });

    useEffect(() => {
        if (hasBeenSeen) {
            trackStat(props.story.id, "views");
        }
    }, [hasBeenSeen]);

    useEffect(() => {
        if (Platform.OS !== 'web') {
            trackStat(props.story.id, "views");
        }
    }, []);

    const difficultyColor = {
        "easy": "ring-green-600/20 bg-green-50 text-green-700",
        "intermediate": "ring-blue-700/10 bg-blue-50 text-blue-700",
        "hard": "ring-purple-700/10 bg-purple-50 text-purple-700",
    }

    const storyFilterChangeCalls: StoryFilterChangeCalls | undefined = useContext(StoryListFilterContext);

    return (
        <Div key={props.story.title} className="flex flex-row px-4 gap-x-4 py-5 hover:bg-slate-100 items-center" ref={visibilityRef} onClick={() => trackStat(props.story.id, "clicks")} style={{ backgroundColor: 'transparent', overflow: 'hidden' }}>
            {Platform.OS === 'web' &&
                <Img className="w-24 h-24 object-cover rounded-full overflow-hidden" src={props.story.previewImageUrl} alt="" />
                || <Div className="rounded-full overflow-hidden">
                    <Img className="w-24 h-24 object-cover rounded-full" src={props.story.previewImageUrl} alt="" />
                </Div>
            }
            <Div style={{ flex: 1 }}>
                <Div className="min-w-0">
                    <Div className="flex flex-row space-x-2">
                        <P className="text-lg font-semibold leading-6 text-gray-900">{props.story.title}</P>
                        {isNew && <Span className="inline-flex items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                            New
                        </Span>}
                    </Div>
                    <Div className="sm:flex flex-row items-end justify-space-evenly gap-x-8">
                        <Div>
                            <Div className="flex flex-row space-x-2">
                                <P className="mt-1 mr-1 truncate text-xs leading-5 bold text-gray-500">
                                    Words:
                                    <Span className="mt-1 truncate text-xs leading-5 text-gray-400"> {props.story.wordCount}</Span>
                                </P>
                                {!userStoryStatistics.hasRead && <P className="mt-1 mr-1 truncate text-xs leading-5 bold text-gray-500">
                                    New:
                                    <Span className="mt-1 truncate text-xs leading-5 text-gray-400"> {userStoryStatistics.newWords} ({userStoryStatistics.newWordsPercentage}%)</Span>
                                </P>}
                            </Div>
                            <P className="mt-1 truncate italic text-xs leading-5 text-gray-400">{props.story.content?.slice(0, 30) + '....'}</P>
                        </Div>
                        <StoryCompletedCheckMark storyId={props.story.id} />
                    </Div>
                </Div>
                <Div className="flex flex-row mt-4 text-sm leading-5 text-gray-500 rounded-full overflow-hidden">
                    <Btn key={`${props.story.id}-difficulty`}
                        className={`rounded-full mr-2 inline-flex flex-row items-center  px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset ${difficultyColor[props.story.difficulty.toLowerCase()]}`}
                        onClick={(e) => {
                            if (!storyFilterChangeCalls) return;
                            e.preventDefault();
                            if (storyFilterChangeCalls!.difficulties.includes(props.story.difficulty)) {
                                storyFilterChangeCalls!.onDifficultyRemove(props.story.difficulty);
                                return;
                            }
                            storyFilterChangeCalls!.onDifficultyAdd(props.story.difficulty);
                        }}
                    >
                        {props.story.difficulty}
                    </Btn>
                    {props.story.collections?.map((collectionName: any) => <Btn key={props.story.title + collectionName}
                        className="mr-2 inline-flex flex-row items-center rounded-full bg-gray-50 px-1.5 py-0.5 text-xs font-medium text-gray-500 ring-1 ring-inset ring-gray-500/10"
                        onClick={(e) => {
                            e.preventDefault();
                            if (storyFilterChangeCalls!.collectionNames.includes(collectionName)) {
                                storyFilterChangeCalls!.onCollectionRemove(collectionName);
                                return;
                            }
                            storyFilterChangeCalls!.onCollectionAdd(collectionName);
                        }}>
                        {collectionName}
                    </Btn>)}
                </Div>
            </Div>
        </Div>
    );
}