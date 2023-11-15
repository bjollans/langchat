import { Language } from "../types/language";

export interface Message {
    type: "User" | "Bot";
    content: string;
    createdAt: Date;
    conversationId?: string;
}