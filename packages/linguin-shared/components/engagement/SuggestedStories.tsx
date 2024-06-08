import StoryListElement from "linguin-shared/components/story/StoryListElement";
import { StoryListEntity } from "linguin-shared/model/translations";
import { useEffect, useState } from "react";
import { useAuth } from "linguin-shared/util/auth";
import { useVisibleStoryIds, useUserStoriesRead } from "linguin-shared/util/clientDb";
import { getStoriesByIds } from "linguin-shared/util/serverDb";
import { Div, H2 } from "linguin-shared/components/RnTwComponents";
import usePostHog from 'linguin-shared/util/usePostHog';

export default function SuggestedStories({navigation}) {
    const STORY_AMOUNT = 3;

    const posthog = usePostHog()
    const auth = useAuth();
    const { data: storyIds, isSuccess: storyIdsLoaded } = useVisibleStoryIds({});
    const { data: storiesRead, isSuccess: storiesReadLoaded } = useUserStoriesRead(auth?.user?.uid ?? null);
    const [stories, setStories] = useState<StoryListEntity[]>([]);

    useEffect(() => {
        if (!storyIdsLoaded || !storiesReadLoaded || storyIds.length < 1) return;
        const storyReadIds = storiesRead.map(x => x.storyId);
        const randomIds = storyIds
            .filter(x => !storyReadIds.includes(x.id))
            .sort(() => Math.random() - Math.random()).slice(0, STORY_AMOUNT).map(x => x.id);
        getStoriesByIds(randomIds).then((stories) => {
            setStories(stories);
        });
    }, [storyIdsLoaded, storiesReadLoaded]);

    const captureClick = () => {
        posthog?.capture('suggested_stories_click', {
            story_ids: stories.map(x => x.id),
        });
    };

    return (
        <Div 
            style={{
                display: 'flex', 
                flexDirection: 'column', 
                gap: '1rem', // approximately "gap-y-4" in Tailwind
                alignItems: 'center', 
                marginTop: '3rem', // "my-12" equivalent
                marginBottom: '6rem' // "mb-24" equivalent
            }} 
            onClick={captureClick}
        >
            <H2 
                style={{
                    fontSize: '1.5rem', // "text-2xl" in Tailwind
                    fontWeight: 'bold' // "font-bold" in Tailwind
                }}
            >
                Read this next
            </H2>
            {stories && stories.map((storyListEntity) => (
                <StoryListElement
                    key={"suggested-story-" + storyListEntity.title}
                    storyListEntity={storyListEntity}
                />
            ))}
        </Div>
    );
}