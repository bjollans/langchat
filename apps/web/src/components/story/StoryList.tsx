"use client";

import { StoryText } from "model/translations";
import StoryListElementWeb from "linguin-shared/components/story/StoryListElementWeb";
import { useState } from "react";
import StoryFilters, { BooleanFilter, Filter } from "components/StoryFilters";
import { StoryListFilterContext, StoryFilterChangeCalls } from "context/storyListFilterContext";
import { useAuth } from "util/auth";
import { useUserStoriesRead } from "util/clientDb";

export interface StoryListProps {
    stories: StoryText[];
    filterDifficulties: string[];
    filterCollectionNames: string[];
}

export default function StoryList(props: StoryListProps) {
    const auth = useAuth();
    const { data: userStoriesRead } = useUserStoriesRead(auth?.user?.uid);
    
    const [showRead, setShowRead] = useState(true);
    const [difficulties, setDifficulties] = useState([] as string[]);
    const [collectionNames, setCollectionNames] = useState([] as string[]);
    
    const storyIdsRead = userStoriesRead?.map((userStoryRead) => userStoryRead.storyId);

    const booleanFilters: Array<BooleanFilter> = [];

    if (auth?.user) {
        booleanFilters.push({
            id: 'showRead',
            name: 'Show Read',
            activeValue: showRead,
            setActiveValue: setShowRead,
        });
    }

    const filters: Array<Filter> = [
        {
            id: 'difficulty',
            name: 'Difficulty',
            activeValues: difficulties,
            setActiveValues: setDifficulties,
            options:
                props.filterDifficulties.map((difficulty: string) => { return { value: difficulty, label: difficulty }; })
        },
        {
            id: 'collection',
            name: 'Topic',
            activeValues: collectionNames,
            setActiveValues: setCollectionNames,
            options:
                props.filterCollectionNames.map((collectionName: string) => { return { value: collectionName, label: collectionName }; })
        }
    ];

    const storyFilterChangeCalls: StoryFilterChangeCalls = {
        difficulties: difficulties,
        onDifficultyAdd: (difficulty) => { setDifficulties(difficulties.concat(difficulty)) },
        onDifficultyRemove: (difficulty) => { setDifficulties(difficulties.filter((d) => d != difficulty)) },
        collections: collectionNames,
        onCollectionAdd: (collection) => { setCollectionNames(collectionNames.concat(collection)) },
        onCollectionRemove: (collection) => { setCollectionNames(collectionNames.filter((c) => c != collection)) },
    };

    return (
        <>
            <StoryListFilterContext.Provider value={storyFilterChangeCalls}>
                <StoryFilters filters={filters} booleanFilters={booleanFilters} />
                <div className="flex flex-col">
                    <ul role="list" className="divide-y divide-gray-100">
                        {props.stories?.filter((story: StoryText) => story.visible)
                            .filter((story: StoryText) => difficulties.length == 0 || difficulties.includes(story.difficulty))
                            .filter((story: StoryText) => collectionNames.length == 0 || story.collections && story.collections.filter((collection: string) => collectionNames.includes(collection)).length > 0)
                            .filter((story: StoryText) => showRead || !storyIdsRead?.includes(story.id))
                            .map((story: any) => <StoryListElementWeb key={story.id} story={story} />)}
                    </ul>
                </div>
            </StoryListFilterContext.Provider>
        </>
    );
}