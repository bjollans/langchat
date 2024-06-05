"use client";

import { DailyUserReadStat } from "linguin-shared/model/stats";
import { createContext, useContext } from "react";
import { apiRequestMultiPlatform } from "util/util";

export interface DailyReadStatUpdateProps {
    wordsSeen?: Array<string>;
    storiesViewed?: Array<string>;
    wordsLookedUp?: Array<string>;
    language: string;
}

export interface DailyReadStatContextType {
    recordStatUpdate: (props: DailyReadStatUpdateProps) => void;
}

export const DailyReadStatContext = createContext<DailyReadStatContextType | null>(null);


export interface DailyReadStatContextProviderProps {
    children: React.ReactNode;
}

export default function DailyReadStatContextProvider({ children }: DailyReadStatContextProviderProps): JSX.Element {
    function recordStatUpdate(props: DailyReadStatUpdateProps) {
        apiRequestMultiPlatform("update-user-word-stats", "POST", {
            wordsSeen: props.wordsSeen,
            storiesViewed: props.storiesViewed,
            wordsLookedUp: props.wordsLookedUp,
            language: props.language,
        });
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