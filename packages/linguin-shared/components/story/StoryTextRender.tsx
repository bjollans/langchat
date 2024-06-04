import { Br, Div } from "linguin-shared/components/RnTwComponents";
import SentenceRender from "linguin-shared/components/text/SentenceRender";
import { AudioSentenceTime, StoryTranslation, TermTranslation, TranslationJson } from "linguin-shared/model/translations";
import { useMemo } from "react";

export interface StoryTextRenderProps {
    storyTranslation: StoryTranslation;
}

export default function StoryTextRender(props: StoryTextRenderProps): JSX.Element {
    const lines = props.storyTranslation.content.split("\n");
    var nonSentenceLinesSeen = 0;
    const lineToTranslatedTextRender = (line: string) => {
        if (line === "") {
            nonSentenceLinesSeen += 1;
            return (<Br />);
        }
        const linePositionStart = props.storyTranslation.content.indexOf(line)!;
        const linePositionEnd = linePositionStart + line.length;
        const lineIndex = lines?.indexOf(line)!;
        const lineTranslationJson: TranslationJson = {
            terms: props.storyTranslation.translationJson?.terms.filter((termTranslation: TermTranslation) =>
                termTranslation.position >= linePositionStart && termTranslation.position + termTranslation.text.length <= linePositionEnd
            ).map((termTranslation: TermTranslation) => {
                const termTranslationCopy = JSON.parse(JSON.stringify(termTranslation))
                termTranslationCopy.position -= linePositionStart;
                return termTranslationCopy;
            }) ?? [],
            wholeSentence: props.storyTranslation.translationJson?.sentences?.find((sentence: TermTranslation) => sentence.position == lineIndex)
        };
        const lineAudioSentenceTime: AudioSentenceTime | undefined = props.storyTranslation.audioSentenceTimes ? props.storyTranslation.audioSentenceTimes[lineIndex - nonSentenceLinesSeen] : undefined;
        const audioStartTime = lineAudioSentenceTime ? lineAudioSentenceTime.start : 0;
        const audioEndTime = lineAudioSentenceTime ? lineAudioSentenceTime.end : 0;
        return (<SentenceRender translatedText={{ content: line, translationJson: lineTranslationJson }}
            audioStartTime={audioStartTime} audioEndTime={audioEndTime}
            hasAudio={props.storyTranslation.audioUrl !== null && props.storyTranslation.audioUrl !== undefined} />);
    };

    const renderedLines = useMemo(() => {
        nonSentenceLinesSeen = 0;
        return props.storyTranslation.content.split("\n").map(lineToTranslatedTextRender);
    }, [props.storyTranslation.content]);

    return (<Div className="max-w-4xl mx-auto">{renderedLines}</Div>);
}