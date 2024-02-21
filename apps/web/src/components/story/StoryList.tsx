"use client";

import StoryFilters from "components/StoryFilters";
import { useFilteredStories, useStoryFilterContext } from "context/storyListFilterContext";
import StoryListElementWeb from "linguin-shared/components/story/StoryListElementWeb";
import { StoryText } from "model/translations";
import { useEffect } from "react";

export interface StoryListProps {
    stories: StoryText[];
    allDifficulties: string[];
    allCollectionNames: string[];
}

export default function StoryList(props: StoryListProps) {
    const stories = useFilteredStories(props.stories);
    const { setAllCollectionNames, setAllDifficulties } = useStoryFilterContext();

    useEffect(() => {
        setAllDifficulties(props.allDifficulties);
        setAllCollectionNames(props.allCollectionNames);
    }, []);

    return (
        <>
            <StoryFilters />
            <div className="flex flex-col">
                <ul role="list" className="divide-y divide-gray-100">
                    {stories.map((story: any) => <StoryListElementWeb key={story.id} story={story} />)}
                </ul>
            </div>
        </>
    );
}