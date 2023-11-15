import { Language } from "../types/language";

export interface Conversation {
    id?: string;
    userId: string;
    translationLang: Language;
    createdAt: Date;
    targetLang: Language;
}