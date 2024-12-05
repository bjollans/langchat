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
import { createStyleSheet, useStyles } from 'react-native-unistyles'


interface StoryProps {
    story: StoryEntity;
    storyTranslation: StoryTranslation;
    navigation?: any;
}

function Story({ story, storyTranslation, navigation }: StoryProps): JSX.Element {
    const { styles } = useStyles(stylesheet)
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
                <Img style={styles.image} src={story?.imageUrl} alt="" />
                <Div style={styles.titleBorderDiv}>
                    {Platform.OS == "web" &&
                        <H3 style={styles.webTitle}>{story?.title}</H3>
                    }
                    {language == "ja" && Platform.OS != "web" && <CheckBox style={styles.rnCheckBox}
                        checked={hasFurigana} onPress={() => setHasFurigana(!hasFurigana)} checkedColor="indigo"
                        title={"Furigana"}
                    />}
                </Div>

                {language == "ja" && Platform.OS == "web"
                    && <Div style={styles.webCheckBoxContainer}><input
                        type="checkbox"
                        defaultChecked={hasFurigana}
                        onChange={(e) => setHasFurigana(e.target.checked)}
                        style={styles.webCheckBox}
                    /><P style={styles.checkBoxText}>Furigana</P></Div>
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

const stylesheet = createStyleSheet((theme: any) => ({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 384,
        width: 448,
        maxWidth: '90%',
        objectFit: 'cover',
        borderRadius: 12,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        marginTop: 0,
        marginBottom: 0,
        marginRight: 'auto',
        marginLeft: 'auto',
        display: 'flex'
    },
    titleBorderDiv: {
        borderBottomWidth: 1,
        borderColor: '#e5e7eb',
        paddingBottom: 20,
        marginTop: 32,
        marginBottom: 32,
        marginRight: 0,
        marginLeft: 0,
        display: 'flex',
        alignItems: 'center'
    },
    webTitle: {
        marginTop: 0,
        marginBottom: 0,
        marginRight: 'auto',
        marginLeft: 'auto',
        fontSize: 24,
        paddingTop: 12,
        paddingBottom: 12,
        paddingRight: 0,
        paddingLeft: 0,
        fontWeight: "600",
        lineHeight: 1.5,
        color: '#1f2937'
    },
    rnCheckBox: {
        height: 16,
        width: 16,
        borderColor: '#d1d5db',
        borderRadius: 3,
        color: '#4f46e5',
        focusRingColor: '#6366f1'
    },
    webCheckBoxContainer: { display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 16 },
    webCheckBox: {
        display: 'flex',
        alignSelf: 'center',
        height: 16,
        width: 16,
        borderColor: '#d1d5db',
        borderRadius: 3,
        color: '#4f46e5',
    },
    checkBoxText: { fontSize: 18, color: '#4b5563' },
    text: {
        color: theme.colors.typography
    }
}))