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
                <Img style={{
                    height: '24rem',
                    width: '90%',
                    maxWidth: '40%',
                    objectFit: 'cover',
                    borderRadius: 3,
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
                    margin: '0 auto',
                    display: 'flex'
                }} src={story?.imageUrl} alt="" />
                <Div style={{
                    borderBottom: '1px solid #e5e7eb',
                    paddingBottom: 20,
                    margin: '2rem 0',
                    display: 'flex',
                    alignItems: 'flex-start'
                }}>
                    {Platform.OS == "web" &&
                        <H3 style={{
                            margin: '0 1.5rem',
                            fontSize: 36,
                            padding: '0.75rem 0',
                            fontWeight: '600',
                            lineHeight: '1.5',
                            color: '#1f2937'
                        }}>{story?.title}</H3>
                    }
                    {language == "ja" && Platform.OS != "web" && <CheckBox style={{
                        height: 16,
                        width: 16,
                        borderColor: '#d1d5db',
                        borderRadius: 3,
                        color: '#4f46e5',
                        focusRingColor: '#6366f1'
                    }}
                        checked={hasFurigana} onPress={() => setHasFurigana(!hasFurigana)} checkedColor="indigo"
                        title={"Furigana"}
                    />}
                </Div>

                {language == "ja" && Platform.OS == "web"
                    && <Div style={{ display: 'flex' }}><input
                        type="checkbox"
                        defaultChecked={hasFurigana}
                        onChange={(e) => setHasFurigana(e.target.checked)}
                        style={{
                            height: 16,
                            width: 16,
                            borderColor: '#d1d5db',
                            borderRadius: 3,
                            color: '#4f46e5',
                        }}
                    /><P style={{ fontSize: 18, lineHeight: 32, color: '#4b5563' }}>Furigana</P></Div>
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