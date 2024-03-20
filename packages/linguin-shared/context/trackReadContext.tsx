"use client";

import { StoryTranslation } from "linguin-shared/model/translations";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "linguin-shared/util/auth";
import { markUserStoryReadAutomatic, useUserStoriesReadAutomatic } from "linguin-shared/util/clientDb";
import { trackStat } from "linguin-shared/util/storyStatistics";
import { StoriesAvailableContext } from "./rnStoriesAvailableContext";
import usePostHog from 'linguin-shared/util/usePostHog';
import { Platform } from "react-native";
import { Callback } from "@react-native-async-storage/async-storage/lib/typescript/types";


export interface ReadUsageContextType {
    registerReadUsageEvent: () => void;
}

export const ReadUsageContext = createContext<ReadUsageContextType | null>(null);


export interface ReadUsageContextProviderProps {
    children: React.ReactNode;
    storyTranslation: StoryTranslation;
}

export default function ReadUsageContextProvider({ children, storyTranslation }: ReadUsageContextProviderProps): JSX.Element {
    const _MIN_READ_USAGE_EVENTS = 4;

    const posthogClient = usePostHog();
    const auth = useAuth();
    const { data: userStoriesRead } = useUserStoriesReadAutomatic(auth?.user?.uid ?? null);

    var [usageEventsCount] = useState(0);
    var [isStoryRead] = useState(false);
    const [incrementUsageEventsCount, setIncrementUsageEventsCount] = useState<Callback>(() => { });

    const rnStoriesAvailableContext = useContext(StoriesAvailableContext);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            markStoryAsRead();
        }, 3 * 60_000); // every 1 second
        return () => clearTimeout(timeoutId); // cleanup
    }, []);

    const markStoryAsRead = () => {
        if (isStoryRead) return;
        isStoryRead = true;

        const currentStoryAlreadyRead = userStoriesRead?.map(x => x.storyId).includes(storyTranslation.id);
        if (currentStoryAlreadyRead) return;

        markUserStoryReadAutomatic(storyTranslation.id, auth?.user?.uid ?? null);

        if (rnStoriesAvailableContext) {
            rnStoriesAvailableContext.setStoriesAvailable(rnStoriesAvailableContext.storiesAvailable - 1);
        }

        trackStat(storyTranslation.id, "reads");

        posthogClient?.capture('story_read', {
            story_id: storyTranslation.id,
            story_target_language: storyTranslation?.targetLanguage,
        });
    }

    useEffect(() => {
        setIncrementUsageEventsCount(() => () => {
            usageEventsCount = usageEventsCount + 1;
            if (usageEventsCount >= _MIN_READ_USAGE_EVENTS && !isStoryRead) {
                markStoryAsRead();
            }
            posthogClient?.capture('read_usage_event', {
                story_id: storyTranslation.id,
                story_target_language: storyTranslation.targetLanguage,
            });
        });
    }, [posthogClient, storyTranslation, userStoriesRead]);

    return (
        <ReadUsageContext.Provider value={{
            registerReadUsageEvent: incrementUsageEventsCount,
        }}>
            {children}
        </ReadUsageContext.Provider>
    );
}

export function useReadUsageContext(): ReadUsageContextType {
    const context = useContext(ReadUsageContext);
    if (context === null) {
        throw new Error('useReadUsageContext must be used within a ReadUsageContextProvider');
    }
    return context;
}

export function useReadUsageContextNullable(): ReadUsageContextType | null {
    const context = useContext(ReadUsageContext);
    return context;
}