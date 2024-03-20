"use client";

import { Div, H3, Img } from "linguin-shared/components/RnTwComponents";
import StoryAudioPlayer from "linguin-shared/components/audio/StoryAudioPlayer";
//import SuggestedStories from "components/engagement/SuggestedStories";
import SuggestedStories from "linguin-shared/components/engagement/SuggestedStories";
import StoryTextRender from "linguin-shared/components/story/StoryTextRender";
import { StoryTranslationIdContext } from "linguin-shared/context/storyTranslationIdContext";
import { TargetLanguageContext } from "linguin-shared/context/targetLanguageContext";
import { StoryEntity, StoryTranslation } from "linguin-shared/model/translations";
import { trackStat } from "linguin-shared/util/storyStatistics";
import { useEffect, useState } from "react";
import { Platform } from 'react-native';
import StoryPayWall from 'linguin-shared/components/story/StoryPayWall';
import StoryQuestionsSection from "./StoryQuestionsSection";
import usePostHog from 'linguin-shared/util/usePostHog';


interface StoryProps {
    story: StoryEntity;
    storyTranslation: StoryTranslation;
    navigation?: any;
}

function Story({ story, storyTranslation, navigation }: StoryProps): JSX.Element {
    const [isPayWallOpen, setIsPayWallOpen] = useState(true);
    const posthogClient = usePostHog();

    useEffect(() => {
        trackStat(story.id, "opens");
        posthogClient?.capture('story_view', {
            story_id: story.id,
            story_title: story?.title,
            target_language: storyTranslation?.targetLanguage,
        });
    }, []);

    return (
        <StoryTranslationIdContext.Provider value={storyTranslation.id}>
            <TargetLanguageContext.Provider value={storyTranslation?.targetLanguage}>
                {storyTranslation?.targetLanguage == "hi" && Platform.OS === 'web' &&
                    <link rel="preload" href="/fonts/Poppins-Regular.ttf" as="font" type="font/poppins" />
                }
                <Img className="h-96 lg:w-2/5 w-[90%] md:w-1/2 sm:w-2/3 mx-auto object-cover rounded-lg shadow-sm shadow-black flex-none" src={story?.imageUrl} alt="" />
                <Div className="border-b border-gray-200 pb-5 my-8 flex items-end">
                    {Platform.OS == "web" &&
                        <H3 className="mx-6 text-base text-4xl py-3 mx-auto font-semibold leading-6 text-gray-900">{story?.title}</H3>
                    }
                </Div>
                {Platform.OS == "web" && <StoryPayWall story={story} isPayWallOpen={isPayWallOpen} setIsPayWallOpen={setIsPayWallOpen} />}
                <StoryTextRender storyTranslation={storyTranslation} />
                <StoryQuestionsSection storyId={story.id} />
                {isPayWallOpen && Platform.OS == "web" && storyTranslation?.audioUrl &&
                    <StoryAudioPlayer src={storyTranslation.audioUrl} />}
            </TargetLanguageContext.Provider>
            {isPayWallOpen && <SuggestedStories navigation={navigation} />}
        </StoryTranslationIdContext.Provider>
    );
}

export default Story;