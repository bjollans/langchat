import { useAuth } from "util/auth";
import { Message } from "../../model/message";
import MessageBox from "./MessageBox";
import { useConversationsByUser, useMessagesForConversation } from "util/db";
import { Conversation } from "model/conversation";

interface ChatHistoryProps {
    messages: Array<Message>;
}

export default function ChatHistory(): JSX.Element {
    const auth = useAuth();
    const {data: conversation, status: conversationStatus} = useConversationsByUser(auth?.user?.id);
    const {data: messages, status: messagesStatus} = useMessagesForConversation(conversation?.id);
    return (
        <>
        <p>{messagesStatus}</p>
        <p>{conversationStatus}</p>
            {messages?.map((message: Message) => MessageBox(message))}
        </>
    );
}
