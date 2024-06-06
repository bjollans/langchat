"use client";

import { createContext, useContext, useState } from "react";
import { apiRequestMultiPlatform } from "util/util";
import { useLanguageContext } from "./languageContext";

export interface DailyReadStatUpdateProps {
    wordsSeen?: string[];
    storiesViewed?: string[];
    wordsLookedUp?: string[];
}

export interface DailyReadStatContextType {
    recordStatUpdate: (props: DailyReadStatUpdateProps) => void;
}

export const DailyReadStatContext = createContext<DailyReadStatContextType | null>(null);


export interface DailyReadStatContextProviderProps {
    children: React.ReactNode;
}

export default function DailyReadStatContextProvider({ children }: DailyReadStatContextProviderProps): JSX.Element {
    const { language } = useLanguageContext();

    let [currentDailyReadStatUpdateProps] = useState<DailyReadStatUpdateProps>({
        wordsSeen: [],
        wordsLookedUp: [],
        storiesViewed: [],
    });
    let [lastRecordedDailyReadStatUpdateProps] = useState<DailyReadStatUpdateProps>({
        wordsSeen: [],
        wordsLookedUp: [],
        storiesViewed: [],
    });

    function mergeDailyReadStats(dailyReadStat1: DailyReadStatUpdateProps, dailyReadStat2: DailyReadStatUpdateProps) {
        return {
            wordsSeen: Array.from(new Set([...dailyReadStat1.wordsSeen ?? [], ...dailyReadStat2.wordsSeen ?? []])),
            wordsLookedUp: Array.from(new Set([...dailyReadStat1.wordsLookedUp ?? [], ...dailyReadStat2.wordsLookedUp ?? []])),
            storiesViewed: Array.from(new Set([...dailyReadStat1.storiesViewed ?? [], ...dailyReadStat2.storiesViewed ?? []])),
        }
    }

    function recordStatUpdate(props: DailyReadStatUpdateProps) {
        currentDailyReadStatUpdateProps = mergeDailyReadStats(currentDailyReadStatUpdateProps, props);
        initiateUpdate();
    }

    let updateWaitTimeout: any = null;
    function initiateUpdate() {
        if (updateWaitTimeout) {
            clearTimeout(updateWaitTimeout);
        }
        updateWaitTimeout = setTimeout(() => {
            if (!_eqList(currentDailyReadStatUpdateProps.wordsSeen ?? [], lastRecordedDailyReadStatUpdateProps.wordsSeen ?? [])
                || !_eqList(currentDailyReadStatUpdateProps.wordsLookedUp ?? [], lastRecordedDailyReadStatUpdateProps.wordsLookedUp ?? [])
                || !_eqList(currentDailyReadStatUpdateProps.storiesViewed ?? [], lastRecordedDailyReadStatUpdateProps.storiesViewed ?? [])) {
                lastRecordedDailyReadStatUpdateProps = structuredClone(currentDailyReadStatUpdateProps);
                apiRequestMultiPlatform("update-user-word-stats", "POST", { language: language, ...currentDailyReadStatUpdateProps });
            }
        }, 5000);
    }

    return (
        <DailyReadStatContext.Provider value={{
            recordStatUpdate: recordStatUpdate,
        }}>
            {children}
        </DailyReadStatContext.Provider>
    );
}

export function useDailyReadStatContext(): DailyReadStatContextType {
    const context = useContext(DailyReadStatContext);
    if (context === null) {
        throw new Error('useDailyReadStatContext must be used within a DailyReadStatContextProvider');
    }
    return context;
}

function _eqList(list1: string[], list2: string[]) {
    return list1.length == list2.length && list1.every((value: string) => list2.includes(value));
}