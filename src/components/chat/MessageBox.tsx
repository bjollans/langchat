import { Message } from "model/message";

export default function MessageBox(message: Message): JSX.Element {
    return (
        <p>{message.content}</p>
    );
}