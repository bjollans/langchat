"use client";

import FuriganaContextProvider from "linguin-shared/context/furiganaContext";
import { Btn, Div, H3, Img, P } from "linguin-shared/components/RnTwComponents";
import StoryAudioPlayer from "linguin-shared/components/audio/StoryAudioPlayer";
import SuggestedStories from "linguin-shared/components/engagement/SuggestedStories";
import StoryTextRender from "linguin-shared/components/story/StoryTextRender";
import LanguageContextProvider from "linguin-shared/context/languageContext";
import { StoryTranslationIdContext } from "linguin-shared/context/storyTranslationIdContext";
import { StoryEntity, StoryTranslation } from "linguin-shared/model/translations";
import { trackStat } from "linguin-shared/util/storyStatistics";
import usePostHog from 'linguin-shared/util/usePostHog';
import { useEffect, useState } from "react";
import { Platform } from 'react-native';
import CheckBox from "linguin-shared/importwrappers/rnCheckBoxImportWrapper";


interface StoryProps {
    story: StoryEntity;
    storyTranslation: StoryTranslation;
    navigation?: any;
}

function Story({ story, storyTranslation, navigation }: StoryProps): JSX.Element {
    const posthogClient = usePostHog();
    const [hasFurigana, setHasFurigana] = useState(false);
    const language = storyTranslation?.targetLanguage;

    useEffect(() => {
        trackStat(story.id, "opens");
        posthogClient?.capture('story_view', {
            story_id: story.id,
            story_title: story?.title,
            target_language: language,
        });
    }, []);

    return (
        <StoryTranslationIdContext.Provider value={storyTranslation.id}>
            <LanguageContextProvider language={storyTranslation.targetLanguage}>
                {language == "hi" && Platform.OS === 'web' &&
                    <link rel="preload" href="/fonts/Poppins-Regular.ttf" as="font" type="font/poppins" />
                }
                <Img className="h-96 lg:w-2/5 w-[90%] md:w-1/2 sm:w-2/3 mx-auto object-cover rounded-lg shadow-sm shadow-black flex-none" src={story?.imageUrl} alt="" />
                <Div className="border-b border-gray-200 pb-5 my-8 flex items-left">
                    {Platform.OS == "web" &&
                        <H3 className="mx-6 text-base text-4xl py-3 mx-auto font-semibold leading-6 text-gray-900">{story?.title}</H3>
                    }
                    {language == "ja" && Platform.OS != "web" && <CheckBox className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                        checked={hasFurigana} onPress={() => setHasFurigana(!hasFurigana)} checkedColor="indigo"
                        title={"Furigana"}
                    />}
                </Div>

                {language == "ja" && Platform.OS == "web"
                    && <Div className="flex"><input
                        type="checkbox"
                        defaultChecked={hasFurigana}
                        onChange={(e) => setHasFurigana(e.target.checked)}
                        className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                    /><P className="text-lg leading-8 text-gray-600">Furigana</P></Div>
                }


                <FuriganaContextProvider hasFurigana={hasFurigana}>
                    <StoryTextRender storyTranslation={storyTranslation} />
                </FuriganaContextProvider>
                {Platform.OS == "web" && storyTranslation?.audioUrl &&
                    <StoryAudioPlayer src={storyTranslation.audioUrl} />}
                <SuggestedStories navigation={navigation} />
            </LanguageContextProvider>
        </StoryTranslationIdContext.Provider>
    );
}

export default Story;