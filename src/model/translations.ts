import { Language } from "../types/language";

export interface TermTranslation {
    text: string;
    translation: string;
    transliteration?: string;
    position: number; //character index for words, line index for sentences
}

export interface TranslationJson {
    wholeSentence?: TermTranslation;
    terms: Array<TermTranslation>;
    sentences?: Array<TermTranslation>;
}

export interface TranslatedText {
    content: string;
    translationJson?: TranslationJson;
}

export interface Message extends TranslatedText {
    role: "user" | "assistant";
    createdAt: Date;
    conversationId: string;
}

export interface StoryText extends TranslatedText {
    storyId: string;
    title: string;
    imageUrl?: string;
    createdAt: Date;
    targetLanguage: Language;
    translationLanguage: Language;
}