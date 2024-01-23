import { StoryText } from "model/translations";
import posthog from "posthog-js";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "util/auth";
import { markUserStoryReadAutomatic, useUserStoriesReadAutomatic } from "util/db";
import { trackStat } from "util/storyStatistics";


export interface ReadUsageContextType {
    onReadUsageEvent: () => void;
}

export const ReadUsageContext = createContext<ReadUsageContextType | null>(null);


export interface ReadUsageContextProviderProps {
    children: React.ReactNode;
    story: StoryText;
}

export default function ReadUsageContextProvider({ children, story }: ReadUsageContextProviderProps): JSX.Element {
    const _MIN_READ_USAGE_EVENTS = 4;
    
    const auth = useAuth();
    const { data: userStoriesRead } = useUserStoriesReadAutomatic(auth.user?.uid ?? null);

    const [usageEventsCount, setUsageEventsCount] = useState(0);
    const [isStoryRead, setIsStoryRead] = useState(false);


    useEffect(() => {
        if (usageEventsCount >= _MIN_READ_USAGE_EVENTS && !isStoryRead) {
            markStoryAsRead();
        }
    }, [usageEventsCount]);


    useEffect(() => {
        const timeoutId = setTimeout(() => {
            markStoryAsRead();
        }, 3 * 60_000); // every 1 second
        return () => clearTimeout(timeoutId); // cleanup
    }, []);

    const markStoryAsRead = () => {
        if (isStoryRead) return;
        setIsStoryRead(true);

        const currentStoryAlreadyRead = userStoriesRead?.map(x => x.storyId).includes(story.id);
        if (currentStoryAlreadyRead) return;

        markUserStoryReadAutomatic(story.id, auth.user?.uid ?? null);

        trackStat(story.id, "reads");

        posthog.capture('story_read', {
            story_id: story.id,
            story_title: story?.title,
            story_target_language: story?.targetLanguage,
        });
    }

    const incrementUsageEventsCount = () => {
        posthog.capture('read_usage_event', {
            story_id: story.id,
            story_title: story.title,
            story_target_language: story.targetLanguage,
        });
        setUsageEventsCount(usageEventsCount + 1);
    };

    return (
        <ReadUsageContext.Provider value={{
            onReadUsageEvent: incrementUsageEventsCount,
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