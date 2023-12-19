import StoryAudioPlayer from "components/audio/StoryAudioPlayer";
import TranslatedTextRender from "components/text/TranslatedTextRender";
import { TargetLanguageContext } from "context/targetLanguageContext";
import { AudioSentenceTime, TermTranslation, TranslationJson } from "model/translations";
import posthog from "posthog-js";
import { useEffect, useState } from "react";
import { requireAuth } from "util/auth";
import { useStory } from "util/db";

interface StoryProps {
    id: string;
}

function Story(props: StoryProps): JSX.Element {
    const { data: story } = useStory(props.id);
    const [currentAudioTime, setCurrentAudioTime] = useState(0);
    const [currentAudioSentenceIndex, setCurrentAudioSentenceIndex] = useState(-1);
    const [isPlayingAudio, setIsPlayingAudio] = useState(false);
    const [hasPlayedAudio, setHasPlayedAudio] = useState(false);

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
        <div className="flex">
            <div className={`p-4 my-4 mb-36 rounded-lg border-1 border-black w-full`}>
                <TargetLanguageContext.Provider value={story?.targetLanguage}>
                    {story?.targetLanguage == "hi" &&
                        <link rel="preload" href="/fonts/Poppins-Regular.ttf" as="font" type="font/poppins" />
                    }
                    <img className="h-96 lg:w-1/2 w-full md:w-2/3 mx-auto object-cover rounded-lg shadow-md shadow-black flex-none" src={story?.imageUrl} alt="" />
                    <div className="border-b border-gray-200 pb-5 my-8 flex items-end">
                        <h3 className="mx-6 text-base text-4xl mx-auto font-semibold leading-6 text-gray-900">{story?.title}</h3>
                    </div>
                    {story?.content.split("\n").map(lineToTranslatedTextRender)}
                    {story?.audioUrl &&
                        <StoryAudioPlayer src={story.audioUrl}
                            currentTime={currentAudioTime}
                            isPlaying={isPlayingAudio}
                            onTimeUpdate={setCurrentAudioTime}
                            onPlayPause={setIsPlayingAudio} />
                    }
                </TargetLanguageContext.Provider>
            </div>
        </div>
    );
}

posthog.featureFlags.override({ 'ux_login_onOff': 'control' })

//AB Test
var exportableStory = Story;
if (posthog.getFeatureFlag('ux_login_onOff') === 'test') {
    exportableStory = requireAuth(Story);
}

export default exportableStory;