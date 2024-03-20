import StoryListElement from "linguin-shared/components/story/StoryListElement";
import { StoryListEntity } from "linguin-shared/model/translations";
import { useEffect, useState } from "react";
import { useAuth } from "linguin-shared/util/auth";
import { useVisibleStoryIds, useUserStoriesRead, useUserStoriesReadAutomatic } from "linguin-shared/util/clientDb";
import { getStoriesByIds } from "linguin-shared/util/serverDb";
import { Div, H2 } from "linguin-shared/components/RnTwComponents";
import { TouchableOpacity, View } from "react-native";
import { useSubscribedContext } from "linguin-shared/context/subscribedContext";
import { useStoriesAvailable } from "linguin-shared/context/rnStoriesAvailableContext";
import usePostHog from 'linguin-shared/util/usePostHog';

export default function SuggestedStories({ navigation }) {
    const STORY_AMOUNT = 3;

    const posthog = usePostHog()

    const auth = useAuth();
    const { data: storyIds, isSuccess: storyIdsLoaded } = useVisibleStoryIds({});
    const { data: storiesRead, isSuccess: storiesReadLoaded } = useUserStoriesRead(auth?.user?.uid ?? null);
    const [stories, setStories] = useState<StoryListEntity[]>([]);
    const { subscribed } = useSubscribedContext();
    const { storiesAvailable } = useStoriesAvailable();
    const { data: userStoriesRead } = useUserStoriesReadAutomatic(auth?.user?.uid ?? null);
    const hasStories = storiesAvailable > 0 || subscribed;

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
        <View className="flex flex-col gap-y-4 items-center my-12 mb-24" onTouchStart={captureClick}>
            <H2 className="text-2xl font-bold">Read this next</H2>
            {stories && stories.map((storyListEntity) => (
                <TouchableOpacity className="bg-white border-b border-gray-200 w-full"
                    onPress={() => {
                        const hasAlreadyReadStory = userStoriesRead?.map(x => x.storyId).includes(storyListEntity.id);
                        navigation.navigate(hasStories || hasAlreadyReadStory ? "Story" : "StoryPaywall", { storyId: storyListEntity.id, storyTitle: storyListEntity.title });
                    }}>
                    <StoryListElement key={"suggested-story-" + storyListEntity.title} storyListEntity={storyListEntity} />
                </TouchableOpacity>
            ))}
        </View>
    );

}