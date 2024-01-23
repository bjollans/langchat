import StoryAudioPlayer from "components/audio/StoryAudioPlayer";
import TranslatedTextRender from "components/text/TranslatedTextRender";
import { TargetLanguageContext } from "context/targetLanguageContext";
import { OnReadUsageEvent, minReadUsageEvents } from "context/trackReadContext";
import { AudioSentenceTime, TermTranslation, TranslationJson } from "model/translations";
import posthog from "posthog-js";
import { useEffect, useState } from "react";
import { requireAuth, useAuth } from "util/auth";
import { markUserStoryReadAutomatic, useStory, useUserStoriesReadAutomatic, useUserStoriesReadAutomaticLast7Days } from "util/db";
import StoryQuestionsSection from "./StoryQuestionsSection";
import { SubscribeContentBlocker } from "./SubscribeContentBlocker";

interface StoryProps {
    id: string;
}

function Story(props: StoryProps): JSX.Element {
    const { data: story } = useStory(props.id);
    const auth = useAuth();
    const { data: userStoriesRead } = useUserStoriesReadAutomatic(auth.user?.uid ?? null);
    const { data: userStoriesReadLast7Days } = useUserStoriesReadAutomaticLast7Days(auth.user?.uid ?? null);
    const [currentAudioTime, setCurrentAudioTime] = useState(0);
    const [currentAudioSentenceIndex, setCurrentAudioSentenceIndex] = useState(-1);
    const [isPlayingAudio, setIsPlayingAudio] = useState(false);
    const [hasPlayedAudio, setHasPlayedAudio] = useState(false);
    const [usageEventsCount, setUsageEventsCount] = useState(0);
    const [isAllowedToRead, setIsAllowedToRead] = useState(true);
    const [isStoryRead, setIsStoryRead] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
                makeStoryRead();
        }, 3*60_000); // every 1 second
        return () => clearTimeout(timeoutId); // cleanup
    }, []);

    const incrementUsageEventsCount = () => {
        posthog.capture('read_usage_event', {
            story_id: props.id,
            story_title: story?.title,
            story_target_language: story?.targetLanguage,
        });
        setUsageEventsCount(usageEventsCount + 1);
    };

    useEffect(() => {
        //AB Test
        const lateMonetization = posthog.getFeatureFlag('monetization_after_2_stories') === 'test';
        const freeStoriesPerWeek = lateMonetization ? 5 : 3;

        const isSubscribed = !!(auth?.user?.planIsActive);
        const userStoriesReadCountLast7Days = new Set(userStoriesReadLast7Days?.map(x => x.storyId) ?? []).size;
        const currentStoryAlreadyRead = userStoriesRead?.map(x => x.storyId).includes(props.id);
        setIsAllowedToRead(isSubscribed || currentStoryAlreadyRead || (userStoriesReadCountLast7Days ?? 0) < freeStoriesPerWeek);
    }, [userStoriesReadLast7Days, userStoriesRead, auth.user?.planIsActive]);

    useEffect(() => {
        if (!isAllowedToRead) {
            posthog.capture('story_blocked', {
                story_id: props.id,
                story_title: story?.title,
                story_target_language: story?.targetLanguage,
            });
        }
    }, [isAllowedToRead]);

    const makeStoryRead = () => {
        if (isStoryRead) return;
        setIsStoryRead(true);

        const currentStoryAlreadyRead = userStoriesRead?.map(x => x.storyId).includes(props.id);
        if (currentStoryAlreadyRead) return;
        
        markUserStoryReadAutomatic(props.id, auth.user?.uid ?? null);
        posthog.capture('story_read', {
            story_id: props.id,
            story_title: story?.title,
            story_target_language: story?.targetLanguage,
        });
    }

    useEffect(() => {
        if (usageEventsCount >= minReadUsageEvents && !isStoryRead) {
            makeStoryRead();
        }
    }, [usageEventsCount]);


    const lines = story?.content.split("\n");
    var nonSentenceLinesSeen = 0;
    const lineToTranslatedTextRender = (line: string) => {
        if (line === "") {
            nonSentenceLinesSeen += 1;
            return (<br />);
        }
        const linePositionStart = story?.content.indexOf(line)!;
        const linePositionEnd = linePositionStart + line.length;
        const lineIndex = lines?.indexOf(line)!;
        const lineTranslationJson: TranslationJson = {
            terms: story?.translationJson?.terms.filter((termTranslation: TermTranslation) =>
                termTranslation.position >= linePositionStart && termTranslation.position + termTranslation.text.length <= linePositionEnd
            ).map((termTranslation: TermTranslation) => {
                const termTranslationCopy = JSON.parse(JSON.stringify(termTranslation))
                termTranslationCopy.position -= linePositionStart;
                return termTranslationCopy;
            }) ?? [],
            wholeSentence: story?.translationJson?.sentences!.find((sentence: TermTranslation) => sentence.position == lineIndex)
        };
        const lineAudioSentenceTime: AudioSentenceTime | undefined = story?.audioSentenceTimes ? story?.audioSentenceTimes[lineIndex - nonSentenceLinesSeen] : undefined;
        const audioStartTime = lineAudioSentenceTime ? lineAudioSentenceTime.start : 0;
        const audioEndTime = lineAudioSentenceTime ? lineAudioSentenceTime.end : 0;
        return (<TranslatedTextRender translatedText={{ content: line, translationJson: lineTranslationJson }}
            isHighlighted={hasPlayedAudio && currentAudioTime < audioEndTime - 0.0001 && currentAudioTime >= audioStartTime - 0.0001}
            isPlayingAudio={isPlayingAudio} hasAudio={story?.audioUrl !== null && story?.audioUrl !== undefined}
            onPlayAudio={() => { setCurrentAudioTime(audioStartTime - 0.00001); setIsPlayingAudio(true) }} />);
    };

    useEffect(() => {
        if (story?.audioSentenceTimes === undefined) return;
        for (var i = 0; i < story.audioSentenceTimes.length; i++) {
            const audioSentenceTime: AudioSentenceTime = story.audioSentenceTimes[i];
            if (audioSentenceTime?.start <= currentAudioTime && audioSentenceTime?.end >= currentAudioTime) {
                setCurrentAudioSentenceIndex(i);
                return;
            }
        }
    }, [currentAudioTime]);

    useEffect(() => {
        if (isPlayingAudio) setHasPlayedAudio(true);
    }, [isPlayingAudio]);

    useEffect(() => {
        posthog.capture('story_view', {
            story_id: props.id,
            story_title: story?.title,
            story_target_language: story?.targetLanguage,
        });
    }, []);

    return (
        <div className="relative flex z-0">
            <div className={`p-4 my-4 mb-36 rounded-lg border-1 border-black w-full`}>
                <OnReadUsageEvent.Provider value={incrementUsageEventsCount}>
                    <TargetLanguageContext.Provider value={story?.targetLanguage}>
                        {story?.targetLanguage == "hi" &&
                            <link rel="preload" href="/fonts/Poppins-Regular.ttf" as="font" type="font/poppins" />
                        }
                        <img className="h-96 lg:w-2/5 w-full md:w-1/2 sm:w-2/3 mx-auto object-cover rounded-lg shadow-md shadow-black flex-none" src={story?.imageUrl} alt="" />
                        <div className="border-b border-gray-200 pb-5 my-8 flex items-end">
                            <h3 className="mx-6 text-base text-4xl mx-auto font-semibold leading-6 text-gray-900">{story?.title}</h3>
                        </div>
                        {!isAllowedToRead
                            && <SubscribeContentBlocker />}
                        {story?.content.split("\n").map(lineToTranslatedTextRender)}
                        <StoryQuestionsSection storyId={props.id} />
                        {isAllowedToRead && story?.audioUrl &&
                            <StoryAudioPlayer src={story.audioUrl}
                                currentTime={currentAudioTime}
                                isPlaying={isPlayingAudio}
                                onTimeUpdate={setCurrentAudioTime}
                                onPlayPause={setIsPlayingAudio} />
                        }

                    </TargetLanguageContext.Provider>
                </OnReadUsageEvent.Provider>
            </div>
        </div>
    );
}

export default requireAuth(Story);