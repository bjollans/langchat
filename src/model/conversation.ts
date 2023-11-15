import { Language } from "../types/language";

export interface Conversation {
    id?: string;
    userId: string;
    translationLanguage: Language;
    createdAt: Date;
    targetLanguage: Language;
}