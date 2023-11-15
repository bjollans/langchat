import ChatHeader from './ChatHeader';
import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";

function Chat() {
    return (
        <>
            <ChatHeader title="Japanese Tutor" />
            <ChatHistory />
            <ChatInput />
        </>
    );
}

export default Chat;
