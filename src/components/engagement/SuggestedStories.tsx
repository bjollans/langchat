import StoryListElement from "components/story/StoryListElement";
import { StoryText } from "model/translations";
import posthog from "posthog-js";
import { useEffect, useState } from "react";
import { useAuth } from "util/auth";
import { useVisibleStoryIds, useUserStoriesRead } from "util/clientDb";
import { getStoriesByIds } from "util/serverDb";

export default function SuggestedStories() {
    const STORY_AMOUNT = 3;

    const auth = useAuth();
    const { data: storyIds, isSuccess: storyIdsLoaded } = useVisibleStoryIds();
    const { data: storiesRead, isSuccess: storiesReadLoaded } = useUserStoriesRead(auth.user?.uid ?? null);
    const [stories, setStories] = useState<StoryText[]>([]);

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
        posthog.capture('suggested_stories_click', {
            story_ids: stories.map(x => x.id),
        });
    };

    return (
        <div className="flex flex-col gap-y-4 items-center mt-12" onClick={captureClick}>
            <h2 className="text-2xl font-bold">Read this next</h2>
            {stories && stories.map((story) => (
                <StoryListElement key={"suggested-story-" + story.title} story={story} />
            ))}
        </div>
    );

}