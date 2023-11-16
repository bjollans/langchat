import { Language } from "../types/language";

export interface Message {
    role: "user" | "assistant";
    content: string;
    createdAt: Date;
    conversationId: string;
}