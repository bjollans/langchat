import Meta from "components/Meta";
import { StoryText } from "model/translations";
import StoryListElement from "./StoryListElement";
import { useState } from "react";
import StoryFilters, { Filter } from "components/StoryFilters";
import { StoryListFilterContext, StoryFilterChangeCalls } from "context/storyListFilterContext";

export interface StoryListProps {
    stories: StoryText[];
    filterDifficulties: string[];
    filterCollectionNames: string[];
}

export default function StoryList(props: StoryListProps) {
    const [difficulties, setDifficulties] = useState([] as string[]);
    const [collectionNames, setCollectionNames] = useState([] as string[]);

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
            name: 'Tags',
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
    }

    return (
        <>
            <StoryListFilterContext.Provider value={storyFilterChangeCalls}>
                <StoryFilters filters={filters} />
                <div className="flex flex-col">
                    <ul role="list" className="divide-y divide-gray-100">
                        {props.stories?.filter((story: StoryText) => story.visible)
                            .filter((story: StoryText) => difficulties.length == 0 || difficulties.includes(story.difficulty))
                            .filter((story: StoryText) => collectionNames.length == 0 || story.collections && story.collections.filter((collection: string) => collectionNames.includes(collection)).length > 0)
                            .map((story: any) => <StoryListElement key={story.id} story={story} />)}
                    </ul>
                </div>
            </StoryListFilterContext.Provider>
        </>
    );
}