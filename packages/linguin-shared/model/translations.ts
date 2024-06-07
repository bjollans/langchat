import { Language } from "../types/language";

export interface TermTranslation {
    text: string;
    translation: string;
    transliteration?: string;
    position: number; //character index for words, line index for sentences
    infinitive?: string;
    infinitiveTranslation?: string;
    infinitiveTransliteration?: string;
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

export interface StoryListEntity {
    id: string;
    storyTranslationId: string;
    title: string;
    previewImageUrl: string;
    createdAt: Date;
    collections: Array<string>;
    difficulty: string;
    wordCount: number;
    content: string;
}

export interface StoryEntity extends TranslatedText {
    id: string;
    title: string;
    imageUrl?: string;
    previewImageUrl?: string;
    createdAt: Date;
    collections?: Array<string>;
    difficulty: string;
}

export interface StoryTranslation extends TranslatedText {
    id: string;
    storyId: string;
    visible: boolean;
    wordCount: number;
    createdAt: Date;
    targetLanguage: Language;
    audioUrl?: string;
    audioSentenceTimes?: Array<AudioSentenceTime>;
    wordsInStory?: Array<string>;
}

export interface StoryToCollection {
    storyId: string;
    collectionName: string;
}

export interface AudioSentenceTime {
    start: number;
    end: number;
}