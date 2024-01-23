import StoryAudioPlayer from "components/audio/StoryAudioPlayer";
import SuggestedStories from "components/engagement/SuggestedStories";
import StoryAudioContextProvider from "context/storyAudioContext";
import { TargetLanguageContext } from "context/targetLanguageContext";
import { OnReadUsageEvent, minReadUsageEvents } from "context/trackReadContext";
import posthog from "posthog-js";
import { useEffect, useState } from "react";
import { requireAuth, useAuth } from "util/auth";
import { markUserStoryReadAutomatic, useStory, useUserStoriesReadAutomatic, useUserStoriesReadAutomaticLast7Days } from "util/db";
import { trackStat } from "util/storyStatistics";
import StoryQuestionsSection from "./StoryQuestionsSection";
import StoryTextRender from "./StoryTextRender";
import { SubscribeContentBlocker } from "./SubscribeContentBlocker";

interface StoryProps {
    id: string;
}

function Story(props: StoryProps): JSX.Element {
    const { data: story } = useStory(props.id);
    const auth = useAuth();
    const { data: userStoriesRead } = useUserStoriesReadAutomatic(auth.user?.uid ?? null);
    const { data: userStoriesReadLast7Days } = useUserStoriesReadAutomaticLast7Days(auth.user?.uid ?? null);

    const [usageEventsCount, setUsageEventsCount] = useState(0);
    const [isAllowedToRead, setIsAllowedToRead] = useState(true);
    const [isStoryRead, setIsStoryRead] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            makeStoryRead();
        }, 3 * 60_000); // every 1 second
        return () => clearTimeout(timeoutId); // cleanup
    }, []);

    useEffect(() => {
        trackStat(props.id, "opens");
    }, []);

    const incrementUsageEventsCount = () => {
        posthog.capture('read_usage_event', {
            story_id: props.id,
            story_title: story?.title,
            story_target_language: story?.targetLanguage,
        });
        setUsageEventsCount(usageEventsCount + 1);
    };

    useEffect(() => {
        //AB Test
        const lateMonetization = posthog.getFeatureFlag('monetization_after_2_stories') === 'test';
        const freeStoriesPerWeek = lateMonetization ? 5 : 3;

        const isSubscribed = !!(auth?.user?.planIsActive);
        const userStoriesReadCountLast7Days = new Set(userStoriesReadLast7Days?.map(x => x.storyId) ?? []).size;
        const currentStoryAlreadyRead = userStoriesRead?.map(x => x.storyId).includes(props.id);
        setIsAllowedToRead(isSubscribed || currentStoryAlreadyRead || (userStoriesReadCountLast7Days ?? 0) < freeStoriesPerWeek);
    }, [userStoriesReadLast7Days, userStoriesRead, auth.user?.planIsActive]);

    useEffect(() => {
        if (!isAllowedToRead) {
            posthog.capture('story_blocked', {
                story_id: props.id,
                story_title: story?.title,
                story_target_language: story?.targetLanguage,
            });
        }
    }, [isAllowedToRead]);

    const makeStoryRead = () => {
        if (isStoryRead) return;
        setIsStoryRead(true);

        const currentStoryAlreadyRead = userStoriesRead?.map(x => x.storyId).includes(props.id);
        if (currentStoryAlreadyRead) return;

        markUserStoryReadAutomatic(props.id, auth.user?.uid ?? null);

        trackStat(props.id, "reads");

        posthog.capture('story_read', {
            story_id: props.id,
            story_title: story?.title,
            story_target_language: story?.targetLanguage,
        });
    }

    useEffect(() => {
        if (usageEventsCount >= minReadUsageEvents && !isStoryRead) {
            makeStoryRead();
        }
    }, [usageEventsCount]);

    useEffect(() => {
        posthog.capture('story_view', {
            story_id: props.id,
            story_title: story?.title,
            story_target_language: story?.targetLanguage,
        });
    }, []);

    return (
        <div className="relative flex z-0">
            <div className={`p-4 my-4 mb-36 rounded-lg border-1 border-black w-full`}>
                <OnReadUsageEvent.Provider value={incrementUsageEventsCount}>
                    <TargetLanguageContext.Provider value={story?.targetLanguage}>
                        <StoryAudioContextProvider>
                            {story?.targetLanguage == "hi" &&
                                <link rel="preload" href="/fonts/Poppins-Regular.ttf" as="font" type="font/poppins" />
                            }
                            <img className="h-96 lg:w-2/5 w-full md:w-1/2 sm:w-2/3 mx-auto object-cover rounded-lg shadow-md shadow-black flex-none" src={story?.imageUrl} alt="" />
                            <div className="border-b border-gray-200 pb-5 my-8 flex items-end">
                                <h3 className="mx-6 text-base text-4xl mx-auto font-semibold leading-6 text-gray-900">{story?.title}</h3>
                            </div>
                            {!isAllowedToRead
                                && <SubscribeContentBlocker />}
                            {story && <StoryTextRender story={story} />}
                            <StoryQuestionsSection storyId={props.id} />
                            {isAllowedToRead && story?.audioUrl &&
                                <StoryAudioPlayer src={story.audioUrl} />
                            }

                        </StoryAudioContextProvider>
                    </TargetLanguageContext.Provider>
                </OnReadUsageEvent.Provider>
                <SuggestedStories />
            </div>
        </div>
    );
}

export default requireAuth(Story);