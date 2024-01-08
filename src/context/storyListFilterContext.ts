import { createContext } from 'react';

export interface StoryFilterChangeCalls {
    difficulties: string[];
    onDifficultyAdd: (v: string) => void;
    onDifficultyRemove: (v: string) => void;
    collections: string[];
    onCollectionAdd: (v: string) => void;
    onCollectionRemove: (v: string) => void;
}

export const StoryListFilterContext = createContext<StoryFilterChangeCalls | undefined>(undefined);