import { Language } from "types/language";

export interface LinguinUser {
    id?: string;
    name?: string;
    email?: string;
    affiliate?: string;
    referrer?: string;
}

export interface LinguinUserProfile {
    targetLanguage: Language;
}

