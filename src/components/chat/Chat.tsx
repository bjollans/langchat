import ChatHeader from './ChatHeader';
import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";

function Chat() {
    return (
        <>
            <ChatHeader title="Japanese Tutor" />
            <ChatHistory messages={[{type: "User", createdAt: new Date(), content: "asd"}]}/>
            <ChatInput />
        </>
    );
}

export default Chat;
