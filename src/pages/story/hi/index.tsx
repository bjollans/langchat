import Meta from "components/Meta";
import StoryList, { StoryListProps } from "components/story/StoryList";
import UserStatistics from "components/user/UserStatistics";
import { StoryText, StoryToCollection } from "model/translations";
import { useRouter } from "next/router";
import posthog from "posthog-js";
import { useEffect } from "react";
import { getAvailableStoryDifficultyLevels, getCollectionNames, getStoriesOrderedByCustom, getStoryCollections } from "util/db";

export async function getServerSidePropsForStoryIndexPage() {
    const stories = await getStoriesOrderedByCustom('title', false);
    const filterDifficulties = await getAvailableStoryDifficultyLevels();
    const storyIds = stories.map((story: any) => story.id);
    const storyCollections = await getStoryCollections(storyIds);
    stories.forEach((story: StoryText) =>
        story.collections = storyCollections.filter((collection: StoryToCollection) =>
            collection.storyId == story.id).map((collection: StoryToCollection) =>
                collection.collectionName));

    const filterCollectionNames = await getCollectionNames().then((collections: any) => collections.map((collection: any) => collection.name));
    return {
        props: {
            stories,
            filterDifficulties,
            filterCollectionNames,
        }
    };
}

export async function getServerSideProps() {
    return getServerSidePropsForStoryIndexPage();
}

function StoryIndexPage(props: StoryListProps) {
    const { query } = useRouter();
    const hasPaid = query.paid;

    useEffect(() => {
        if (hasPaid == 'true') {
            posthog.capture('purchase');
        }
    }, [query]);

    return (
        <>
            <Meta title="Hindi Mini Stories" />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    <UserStatistics />
                    {StoryList(props)}
                </div>
            </div>
        </>
    );
}

export default StoryIndexPage;
