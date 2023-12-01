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
            <div className={`p-4 my-4 rounded-lg border-1 border-black`}>
                <img className="h-96 lg:w-1/2 w-full md:w-2/3 mx-auto object-cover rounded-lg shadow-md shadow-black flex-none" src={story?.imageUrl} alt="" />
                <div className="border-b border-gray-200 pb-5 my-8 flex items-end">
                    <h3 className="mx-6 text-base text-4xl mx-auto font-semibold leading-6 text-gray-900">{story?.title}</h3>
                </div>
                {translatedLines}
            </div>
        </div>
    );
}