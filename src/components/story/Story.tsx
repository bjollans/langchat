import StoryAudioPlayer from "components/audio/StoryAudioPlayer";
import SuggestedStories from "components/engagement/SuggestedStories";
import StoryAudioContextProvider from "context/storyAudioContext";
import { TargetLanguageContext } from "context/targetLanguageContext";
import ReadUsageContextProvider from "context/trackReadContext";
import { StoryText } from "model/translations";
import posthog from "posthog-js";
import { useEffect, useState } from "react";
import { requireAuth } from "util/auth";
import { trackStat } from "util/storyStatistics";
import { StoryPayWall } from "./StoryPayWall";
import StoryQuestionsSection from "./StoryQuestionsSection";
import StoryTextRender from "./StoryTextRender";

interface StoryProps {
    story: StoryText;
}

function Story({ story }: StoryProps): JSX.Element {
    const [isPayWallOpen, setIsPayWallOpen] = useState(false);

    useEffect(() => {
        trackStat(story.id, "opens");
        posthog.capture('story_view', {
            story_id: story.id,
            story_title: story?.title,
            story_target_language: story?.targetLanguage,
        });
    }, []);


    return (
        <div className="relative flex z-0">
            <div className={`p-4 my-4 mb-36 rounded-lg border-1 border-black w-full`}>
                <TargetLanguageContext.Provider value={story?.targetLanguage}>
                    <ReadUsageContextProvider story={story}>
                        <StoryAudioContextProvider>
                            {story?.targetLanguage == "hi" &&
                                <link rel="preload" href="/fonts/Poppins-Regular.ttf" as="font" type="font/poppins" />
                            }
                            <img className="h-96 lg:w-2/5 w-full md:w-1/2 sm:w-2/3 mx-auto object-cover rounded-lg shadow-md shadow-black flex-none" src={story?.imageUrl} alt="" />
                            <div className="border-b border-gray-200 pb-5 my-8 flex items-end">
                                <h3 className="mx-6 text-base text-4xl mx-auto font-semibold leading-6 text-gray-900">{story?.title}</h3>
                            </div>
                            <StoryPayWall story={story} isPayWallOpen={isPayWallOpen} setIsPayWallOpen={setIsPayWallOpen} />
                            <StoryTextRender story={story} />
                            <StoryQuestionsSection storyId={story.id} />
                            {isPayWallOpen && story?.audioUrl &&
                                <StoryAudioPlayer src={story.audioUrl} />}
                        </StoryAudioContextProvider>
                    </ReadUsageContextProvider>
                </TargetLanguageContext.Provider>
                {isPayWallOpen && <SuggestedStories />}
            </div>
        </div>
    );
}

export default requireAuth(Story);