import { Message } from "model/message";

export default function MessageBox(message: Message): JSX.Element {
    const color: string = message.type === "user" ? "bg-slate-200" : "bg-blue-300";
    const alignment: string = message.type === "user" ? "mr-4 ml-auto" : "ml-4 mr-auto";
    const style = `${color} ${alignment}`;
    return (
        <div className="flex">

        <div className={`flex-wrap p-4 mt-4 rounded-lg border-1 border-black ${style}`}>
            <span>
                {message.content}
            </span>
        </div>

        </div>
    );
}