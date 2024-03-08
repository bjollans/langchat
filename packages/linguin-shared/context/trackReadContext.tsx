"use client";

import { StoryText } from "linguin-shared/model/translations";
import posthog from "posthog-js";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "linguin-shared/util/auth";
import { markUserStoryReadAutomatic, useStories, useUserStoriesReadAutomatic } from "linguin-shared/util/clientDb";
import { trackStat } from "linguin-shared/util/storyStatistics";
import { StoriesAvailableContext } from "./rnStoriesAvailableContext";


export interface ReadUsageContextType {
    registerReadUsageEvent: () => void;
    subscribeToStoryRead: (key: string, callback: () => void) => void;
}

export const ReadUsageContext = createContext<ReadUsageContextType | null>(null);


export interface ReadUsageContextProviderProps {
    children: React.ReactNode;
    story: StoryText;
}

export default function ReadUsageContextProvider({ children, story }: ReadUsageContextProviderProps): JSX.Element {
    const _MIN_READ_USAGE_EVENTS = 4;

    const auth = useAuth();
    const { data: userStoriesRead } = useUserStoriesReadAutomatic(auth?.user?.uid ?? null);

    var [usageEventsCount] = useState(0);
    var [isStoryRead] = useState(false);

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

        const currentStoryAlreadyRead = userStoriesRead?.map(x => x.storyId).includes(story.id);
        if (currentStoryAlreadyRead) return;

        markUserStoryReadAutomatic(story.id, auth?.user?.uid ?? null);

        if (rnStoriesAvailableContext) {
            rnStoriesAvailableContext.setStoriesAvailable(rnStoriesAvailableContext.storiesAvailable - 1);
        }

        trackStat(story.id, "reads");

        posthog.capture('story_read', {
            story_id: story.id,
            story_title: story?.title,
            story_target_language: story?.targetLanguage,
        });
    }

    const incrementUsageEventsCount = () => {
        usageEventsCount = usageEventsCount + 1;
        if (usageEventsCount >= _MIN_READ_USAGE_EVENTS && !isStoryRead) {
            markStoryAsRead();
        }
        posthog.capture('read_usage_event', {
            story_id: story.id,
            story_title: story.title,
            story_target_language: story.targetLanguage,
        });
    };

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