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

export interface StoryText extends TranslatedText {
    id: string;
    visible: boolean;
    wordCount: number;
    title: string;
    imageUrl?: string;
    previewImageUrl?: string;
    createdAt: Date;
    targetLanguage: Language;
    translationLanguage: Language;
    audioUrl?: string;
    audioSentenceTimes?: Array<AudioSentenceTime>;
    collections?: Array<string>;
    difficulty: string;
    wordsInStory?: Array<string>;
}

export interface StoryToCollection {
    storyId: string;
    collectionName: string;
}

export interface StoryQuestionData {
    question: string;
    correctAnswer: string;
    otherOptions: Array<string>;
}
    

export interface AudioSentenceTime {
    start: number;
    end: number;
}