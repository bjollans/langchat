import { Br } from "linguin-shared/components/RnTwComponents";
import SentenceRender from "linguin-shared/components/text/SentenceRender";
import { AudioSentenceTime, StoryTranslation, TermTranslation, TranslationJson } from "linguin-shared/model/translations";

export default class TranslationRenderer {
    storyTranslation: StoryTranslation;
    nonSentenceLinesSeen = 0;
    lines: string[];

    constructor(storyTranslation: StoryTranslation) {
        this.storyTranslation = storyTranslation;
        this.lines = storyTranslation.content.split("\n");
    }

    renderLines() {
        const ret: any[] = [];
        const lines = this.storyTranslation.content.split("\n");
        for (const line of lines) {
            ret.push(this.lineToTranslatedTextRender(line));
        }
        return ret;
    }


    lineToTranslatedTextRender(line: string) {
        if (line === "") {
            this.nonSentenceLinesSeen += 1;
            return (<Br />);
        }
        const linePositionStart = this.storyTranslation.content.indexOf(line)!;
        const linePositionEnd = linePositionStart + line.length;
        const lineIndex = this.lines?.indexOf(line)!;
        const lineTranslationJson: TranslationJson = {
            terms: this.storyTranslation.translationJson?.terms.filter((termTranslation: TermTranslation) =>
                termTranslation.position >= linePositionStart && termTranslation.position + termTranslation.text.length <= linePositionEnd
            ).map((termTranslation: TermTranslation) => {
                const termTranslationCopy = JSON.parse(JSON.stringify(termTranslation))
                termTranslationCopy.position -= linePositionStart;
                return termTranslationCopy;
            }) ?? [],
            wholeSentence: this.storyTranslation.translationJson?.sentences?.find((sentence: TermTranslation) => sentence.position == lineIndex)
        };
        const lineAudioSentenceTime: AudioSentenceTime | undefined = this.storyTranslation.audioSentenceTimes ? this.storyTranslation.audioSentenceTimes[lineIndex - this.nonSentenceLinesSeen] : undefined;
        const audioStartTime = lineAudioSentenceTime ? lineAudioSentenceTime.start : 0;
        const audioEndTime = lineAudioSentenceTime ? lineAudioSentenceTime.end : 0;
        return (<SentenceRender translatedText={{ content: line, translationJson: lineTranslationJson }}
            audioStartTime={audioStartTime} audioEndTime={audioEndTime}
            hasAudio={this.storyTranslation.audioUrl !== null && this.storyTranslation.audioUrl !== undefined} />);
    }
}