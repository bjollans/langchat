import { useAuth } from 'util/auth';
import ChatHeader from './ChatHeader';
import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";
import { useConversationsByUser } from 'util/clientDb';

function Chat() {
    const auth = useAuth();
    const { data: conversation } = useConversationsByUser(auth?.user?.id);
    return (
        <div className='border border-solid border-black m-4 rounded-lg shadow-lg'>
            <ChatHeader conversation={conversation} />
            <ChatHistory conversationId={conversation?.id} />
            <ChatInput conversationId={conversation?.id} />
        </div>

    );
}

export default Chat;
