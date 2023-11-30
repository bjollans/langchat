import { Message, TermTranslation } from "model/translations";
import TranslatedTerm from "../text/TranslatedWord";
import TranslatedTextRender from "components/text/TranslatedTextRender";

export default function MessageBox(message: Message): JSX.Element {
    const color: string = message.role === "user" ? "bg-slate-200" : "bg-blue-300";
    const alignment: string = message.role === "user" ? "mr-4 ml-auto" : "ml-4 mr-auto";
    const style = `${color} ${alignment}`;

    return (
        <div className="flex">
            <div className={`p-4 mt-4 rounded-lg border-1 border-black ${style}`}>
                <TranslatedTextRender translatedText={message}/>
            </div>
        </div>
    );
}