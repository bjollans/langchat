"use client";

import { StoryListEntity } from 'model/translations';
import { createContext, useState, useContext } from 'react';
import { useAuth } from 'linguin-shared/util/auth';
import { useUserStoriesRead } from "linguin-shared/util/clientDb";

export interface StoryFilterChangeCalls {
    allDifficulties: string[];
    setAllDifficulties: (v: string[]) => void;
    difficulties: string[];
    setDifficulties: (v: string[]) => void;
    onDifficultyAdd: (v: string) => void;
    onDifficultyRemove: (v: string) => void;
    allCollectionNames: string[];
    setAllCollectionNames: (v: string[]) => void;
    collectionNames: string[];
    setCollectionNames: (v: string[]) => void;
    onCollectionAdd: (v: string) => void;
    onCollectionRemove: (v: string) => void;
    showRead: boolean;
    setShowRead: (v: boolean) => void;
}

export const StoryListFilterContext = createContext<StoryFilterChangeCalls | undefined>(undefined);

export default function StoryListFilterContextProvider({ children }: { children: React.ReactNode }) {
    const [allDifficulties, setAllDifficulties] = useState([] as string[]);
    const [difficulties, setDifficulties] = useState([] as string[]);
    const [allCollectionNames, setAllCollectionNames] = useState([] as string[]);
    const [collectionNames, setCollectionNames] = useState([] as string[]);
    const [showRead, setShowRead] = useState(true);


    const storyFilterChangeCalls: StoryFilterChangeCalls = {
        allDifficulties: allDifficulties,
        setAllDifficulties: setAllDifficulties,
        difficulties: difficulties,
        setDifficulties: setDifficulties,
        onDifficultyAdd: (difficulty) => { setDifficulties(difficulties.concat(difficulty)) },
        onDifficultyRemove: (difficulty) => { setDifficulties(difficulties.filter((d) => d != difficulty)) },
        allCollectionNames: allCollectionNames,
        setAllCollectionNames: setAllCollectionNames,
        collectionNames: collectionNames,
        setCollectionNames: setCollectionNames,
        onCollectionAdd: (collection) => { setCollectionNames(collectionNames.concat(collection)) },
        onCollectionRemove: (collection) => { setCollectionNames(collectionNames.filter((c) => c != collection)) },
        showRead: showRead,
        setShowRead: setShowRead,
    };

    return (
        <StoryListFilterContext.Provider value={storyFilterChangeCalls}>
            {children}
        </StoryListFilterContext.Provider>
    )
}


export function useStoryFilterContext() {
    const context = useContext(StoryListFilterContext);
    if (context === undefined) {
        throw new Error('useStoryFilterContext must be used within a StoryListFilterContextProvider');
    }
    return context;
}


export function useFilteredStories(stories: StoryListEntity[]) {
    const { difficulties, collectionNames, showRead } = useStoryFilterContext();
    const auth = useAuth();
    const { data: userStoriesRead } = useUserStoriesRead(auth?.user?.uid);

    const storyIdsRead = userStoriesRead?.map((userStoryRead) => userStoryRead.storyId);

    return stories.filter((story: StoryListEntity) => difficulties.length == 0 || difficulties.includes(story.difficulty))
        .filter((story: StoryListEntity) => collectionNames.length == 0 || story.collections && story.collections.filter((collection: string) => collectionNames.includes(collection)).length > 0)
        .filter((story: StoryListEntity) => showRead || !storyIdsRead?.includes(story.id))
}