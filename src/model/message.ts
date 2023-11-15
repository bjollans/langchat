import { Language } from "../types/language";

export interface Message {
    type: "user" | "bot";
    content: string;
    createdAt: Date;
    conversationId: string;
}