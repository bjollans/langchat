import { Message, StoryText, TermTranslation, TranslationJson } from "model/translations";
import TranslatedTerm from "../text/TranslatedWord";
import TranslatedTextRender from "components/text/TranslatedTextRender";
import { useStory } from "util/db";

interface StoryProps {
    id: string;
}

export default function Story(props: StoryProps): JSX.Element {
    const { data: story } = useStory(props.id);
    const lines = story?.content.split("\n");
    const translatedLines: Array<JSX.Element> = [];
    for (var line of lines ?? []) {
        if (line === "") {
            translatedLines.push(<br />);
            continue;
        }
        const linePositionStart = story?.content.indexOf(line)!;
        const linePositionEnd = linePositionStart + line.length;
        const lineIndex = lines?.indexOf(line)!;
        const lineTranslationJson: TranslationJson = {
            terms: story?.translationJson?.terms.filter((termTranslation: TermTranslation) =>
                termTranslation.position >= linePositionStart && termTranslation.position + termTranslation.text.length <= linePositionEnd
            ).map((termTranslation: TermTranslation) => {
                termTranslation.position -= linePositionStart;
                return termTranslation;
            }) ?? [],
            wholeSentence: story?.translationJson?.sentences!.find((sentence: TermTranslation) => sentence.position == lineIndex)
        }
        translatedLines.push(<TranslatedTextRender translatedText={{ content: line, translationJson: lineTranslationJson }} />);
    }

    return (
        <div className="flex">
            <div className={`p-4 mt-4 rounded-lg border-1 border-black`}>
                {translatedLines}
            </div>
        </div>
    );
}