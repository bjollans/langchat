import { Br, Div } from "linguin-shared/components/RnTwComponents";
import TranslatedTextRender from "linguin-shared/components/text/TranslatedTextRender";
import { useStoryAudioContext } from "linguin-shared/context/storyAudioContext";
import { useState, useEffect, useMemo } from "react";
import { AudioSentenceTime, StoryText, TermTranslation, TranslationJson } from "linguin-shared/model/translations";

export interface StoryTextRenderProps {
    story: StoryText;
}

export default function StoryTextRender(props: StoryTextRenderProps): JSX.Element {
    const lines = props.story.content.split("\n");
    var nonSentenceLinesSeen = 0;
    const lineToTranslatedTextRender = (line: string) => {
        if (line === "") {
            nonSentenceLinesSeen += 1;
            return (<Br />);
        }
        const linePositionStart = props.story.content.indexOf(line)!;
        const linePositionEnd = linePositionStart + line.length;
        const lineIndex = lines?.indexOf(line)!;
        const lineTranslationJson: TranslationJson = {
            terms: props.story.translationJson?.terms.filter((termTranslation: TermTranslation) =>
                termTranslation.position >= linePositionStart && termTranslation.position + termTranslation.text.length <= linePositionEnd
            ).map((termTranslation: TermTranslation) => {
                const termTranslationCopy = JSON.parse(JSON.stringify(termTranslation))
                termTranslationCopy.position -= linePositionStart;
                return termTranslationCopy;
            }) ?? [],
            wholeSentence: props.story.translationJson?.sentences?.find((sentence: TermTranslation) => sentence.position == lineIndex)
        };
        const lineAudioSentenceTime: AudioSentenceTime | undefined = props.story.audioSentenceTimes ? props.story.audioSentenceTimes[lineIndex - nonSentenceLinesSeen] : undefined;
        const audioStartTime = lineAudioSentenceTime ? lineAudioSentenceTime.start : 0;
        const audioEndTime = lineAudioSentenceTime ? lineAudioSentenceTime.end : 0;
        return (<TranslatedTextRender translatedText={{ content: line, translationJson: lineTranslationJson }}
            story={props.story} audioStartTime={audioStartTime} audioEndTime={audioEndTime} 
            hasAudio={props.story.audioUrl !== null && props.story.audioUrl !== undefined} />);
    };

    const renderedLines = useMemo(() => props.story.content.split("\n").map(lineToTranslatedTextRender), [props.story.content]);

    return (<Div className="max-w-4xl mx-auto">{renderedLines}</Div>);
}