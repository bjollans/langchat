import { Message, TermTranslation } from "model/message";
import TranslatedTerm from "./TranslatedWord";

export default function MessageBox(message: Message): JSX.Element {
    const color: string = message.role === "user" ? "bg-slate-200" : "bg-blue-300";
    const alignment: string = message.role === "user" ? "mr-4 ml-auto" : "ml-4 mr-auto";
    const style = `${color} ${alignment}`;
    console.log(message.translationJson);
    const translatedWords: Array<JSX.Element> = [];

    for (var i = 0; i < message.content.length; i++) {
        const termAtThisPosition = message.translationJson?.terms.filter((termTranslation: TermTranslation) =>
            termTranslation.position <= i && termTranslation.position + termTranslation.term.length > i
        )
        if (termAtThisPosition && termAtThisPosition.length > 0) {
            translatedWords.push((<TranslatedTerm term={termAtThisPosition[0].term} translation={termAtThisPosition[0].translation}/>));
            i = termAtThisPosition[0].position + termAtThisPosition[0].term.length;
        }
        else {
            translatedWords.push(<span>{message.content[i]}</span>);
        }
    }

    return (
        <div className="flex">
            <div className={`flex-wrap p-4 mt-4 rounded-lg border-1 border-black ${style}`}>
                {translatedWords}
            </div>

        </div>
    );
}