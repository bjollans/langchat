import { Message } from "model/message";
import posthog from "posthog-js";
import analytics from "util/analytics";
import { useAuth } from "util/auth";
import { sendMessage } from "util/db";

interface ChatInputProps {
    conversationId: string;
};

export default function ChatInput(props: ChatInputProps) {
    const sendSymbol = (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-6 h-6">
        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
    </svg>);

    const handleSubmit = (e) => {
        //analytics.track("message_sent");
        //posthog.capture("message_sent");
        e.preventDefault();
        const question = e?.target?.message?.value;
        e.target.message.value = "";
        if (!!question) {
            const message: Message = { content: question, type: "user", conversationId: props.conversationId, createdAt: new Date() };
            sendMessage(message);
        }
    };

    const ready = !!(props.conversationId);

    return (
        <>
            <div className="px-4 pt-4 pb-3 sm:px-6">
                <form onSubmit={handleSubmit}>
                    <div className={`flex rounded-md border shadow-sm ring-1 ring-gray-300`}>
                        <input
                            type="text"
                            name="message"
                            className="block w-full px-4 py-3 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none focus:"
                            placeholder="Say something"
                        />
                        <div className="flex-shrink-0 mx-4">
                            <button
                                type="submit"
                                disabled={!ready}
                                className="inline-flex items-center px-3 py-3"
                            >
                                {sendSymbol}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
