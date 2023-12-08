import { Language } from "types/language";

export interface Vocab {
    id?: string;
    userId: string;
    targetLanguage: Language;
    vocab: string;
    translation: string;
    transliteration?: string;
    timesPracticed: number;
    lastPracticed: Date;
    timesCorrect: number;
    createdAt: Date;
    deleted: boolean;
}