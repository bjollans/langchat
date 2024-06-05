import { Language } from "types/language";

export interface DailyUserReadStat {
    userId: string;
    date: string;
    language: Language;
    wordsSeen: string[];
    wordsSeenCount: number;
    storiesViewed: string[];
    storiesViewedCount: number;
    lastUpdatedAt: Date;
}