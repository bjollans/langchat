"use client";

import { Div, H3, Img, P } from "linguin-shared/components/RnTwComponents";
import StoryAudioPlayer from "linguin-shared/components/audio/StoryAudioPlayer";
//import SuggestedStories from "components/engagement/SuggestedStories";
import StoryAudioContextProvider from "linguin-shared/context/storyAudioContext";
import { StoryIdContext } from "linguin-shared/context/storyIdContext";
import { TargetLanguageContext } from "linguin-shared/context/targetLanguageContext";
import ReadUsageContextProvider from "linguin-shared/context/trackReadContext";
import { StoryText } from "linguin-shared/model/translations";
import posthog from "posthog-js";
import { useEffect, useState } from "react";
import { Platform } from 'react-native';
import { trackStat } from "linguin-shared/util/storyStatistics";
import { StoryPayWall } from "./StoryPayWall";
import StoryQuestionsSection from "./StoryQuestionsSection";
import StoryTextRender from "linguin-shared/components/story/StoryTextRender";
import SuggestedStories from "linguin-shared/components/engagement/SuggestedStories";
import {Text, Image} from "react-native";

import { styled } from 'nativewind';

interface StoryProps {
    story: StoryText;
}

function Story({ story }: StoryProps): JSX.Element {
    const [isPayWallOpen, setIsPayWallOpen] = useState(true);

    useEffect(() => {
        trackStat(story.id, "opens");
        posthog.capture('story_view', {
            story_id: story.id,
            story_title: story?.title,
            story_target_language: story?.targetLanguage,
        });
    }, []);

    const StyledText = styled(Text);

    return (

        <StoryIdContext.Provider value={story.id}>
            <TargetLanguageContext.Provider value={story?.targetLanguage}>
                <ReadUsageContextProvider story={story}>
                    <StoryAudioContextProvider>
                        {story?.targetLanguage == "hi" && Platform.OS === 'web' &&
                            <link rel="preload" href="/fonts/Poppins-Regular.ttf" as="font" type="font/poppins" />
                        }
                        <Img className="h-96 lg:w-2/5 w-full md:w-1/2 sm:w-2/3 mx-auto object-cover rounded-lg shadow-sm shadow-black flex-none" src={story?.imageUrl} alt="" />
                        <Div className="border-b border-gray-200 pb-5 my-8 flex items-end">
                            <H3 className="mx-6 text-base text-4xl mx-auto font-semibold leading-6 text-gray-900">{story?.title}</H3>
                        </Div>
                        <StoryPayWall story={story} isPayWallOpen={isPayWallOpen} setIsPayWallOpen={setIsPayWallOpen} />
                        <StoryTextRender story={story} />
                        <StoryQuestionsSection storyId={story.id} />
                        {isPayWallOpen && story?.audioUrl &&
                            <StoryAudioPlayer src={story.audioUrl} />}
                    </StoryAudioContextProvider>
                </ReadUsageContextProvider>
            </TargetLanguageContext.Provider>
            {isPayWallOpen && <SuggestedStories />}
        </StoryIdContext.Provider>
    );
}

export default Story;