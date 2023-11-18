import { Language } from "../types/language";

export type ConversationStatus = "done" | "pending"

export interface Conversation {
    id?: string;
    userId: string;
    status: ConversationStatus;
    translationLang: Language;
    createdAt: Date;
    targetLang: Language;
}