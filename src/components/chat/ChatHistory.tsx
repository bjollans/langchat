import { useAuth } from "util/auth";
import { Message } from "../../model/translations";
import MessageBox from "./MessageBox";
import { useConversationsByUser, useMessagesForConversation } from "util/clientDb";

interface ChatHistoryProps {
    conversationId: string;
};

export default function ChatHistory(props: ChatHistoryProps): JSX.Element {
    const { data: messages } = useMessagesForConversation(props.conversationId);
    return (
        <div className="">
            {messages?.map((message: Message) => MessageBox(message))}
        </div>
    );
}
