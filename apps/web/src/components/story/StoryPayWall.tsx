import PricingSection from "components/PricingSection";
import { Div, H3 } from "@linguin-shared/components/RnTwComponents";
import { StoryText } from "model/translations";
import posthog from "posthog-js";
import { useEffect, useState } from "react";
import { useAuth } from "util/auth";
import { useUserStoriesReadAutomatic, useUserStoriesReadAutomaticLast7Days } from "util/clientDb";

export interface StoryPayWallProps {
    story: StoryText;
    isPayWallOpen: boolean;
    setIsPayWallOpen: (isPayWallOpen: boolean) => void;
}

export function StoryPayWall({ story, isPayWallOpen, setIsPayWallOpen }: StoryPayWallProps): JSX.Element {
    const auth = useAuth();
    const { data: userStoriesRead } = useUserStoriesReadAutomatic(auth.user?.uid ?? null);
    const { data: userStoriesReadLast7Days } = useUserStoriesReadAutomaticLast7Days(auth.user?.uid ?? null);

    const [freeStoriesPerWeek, setFreeStoriesPerWeek] = useState(3);

    useEffect(() => {
        const lateMonetization = posthog.getFeatureFlag('monetization_after_2_stories') === 'test';
        setFreeStoriesPerWeek(lateMonetization ? 5 : 3);
    }, []);

    useEffect(() => {
        const isSubscribed = !!(auth?.user?.planIsActive);
        const userStoriesReadCountLast7Days = new Set(userStoriesReadLast7Days?.map(x => x.storyId) ?? []).size;
        const currentStoryAlreadyRead = userStoriesRead?.map(x => x.storyId).includes(story.id);
        setIsPayWallOpen(isSubscribed || currentStoryAlreadyRead || (userStoriesReadCountLast7Days ?? 0) < freeStoriesPerWeek);
    }, [userStoriesReadLast7Days, userStoriesRead, auth.user?.planIsActive]);

    useEffect(() => {
        if (!isPayWallOpen) {
            posthog.capture('story_blocked', {
                story_id: story.id,
                story_title: story.title,
                story_target_language: story.targetLanguage,
            });
        }
    }, [isPayWallOpen]);

    if (isPayWallOpen) return (<></>);

    return (
        <Div className="flex justify-center absolute w-full z-10 h-full backdrop-blur-sm bg-white bg-opacity-60">
            <Div className="rounded-lg p-4 mx-auto">
                <H3 className="text-black text-4xl max-w-lg tracking-tight text-center font-bold mb-4">
                    You have reached your free weekly limit of {freeStoriesPerWeek} stories
                </H3>
                <PricingSection />
            </Div>
        </Div>
    );
}