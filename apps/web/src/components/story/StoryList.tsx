"use client";

import StoryFilters from "components/StoryFilters";
import { useFilteredStories, useStoryFilterContext } from "context/storyListFilterContext";
import StoryListElementWeb from "linguin-shared/components/story/StoryListElementWeb";
import { StoryListEntity } from "model/translations";
import { useEffect } from "react";
import { useTargetLanguageContext } from "@linguin-shared/context/targetLanguageContext";

export interface StoryListProps {
    storyListEntities: StoryListEntity[];
    allDifficulties: string[];
    allCollectionNames: string[];
}

export default function StoryList(props: StoryListProps) {
    const { setTargetLanguage } = useTargetLanguageContext();
    useEffect(() => {
        setTargetLanguage("hi");
    }, []);
    const storyListEntities = useFilteredStories(props.storyListEntities);
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
                    {storyListEntities.map((storyListEntity: any) => <StoryListElementWeb key={storyListEntity.id} storyListEntity={storyListEntity} />)}
                </ul>
            </div>
        </>
    );
}