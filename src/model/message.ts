import { Language } from "../types/language";

export interface TermTranslation {
    term: string;
    translation: string;
    position: number;
}

export interface TranslationJson {
    wholeSentence: string;
    terms: Array<TermTranslation>;
}

export interface Message {
    role: "user" | "assistant";
    content: string;
    createdAt: Date;
    conversationId: string;
    translationJson?: TranslationJson;
}