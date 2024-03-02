import Meta from "components/Meta";
import BrandedWelcome from "components/brand/BrandedWelcome";
import StoryList, { StoryListProps } from "components/story/StoryList";
import PurchasedTracker from "components/tracking/PurchasedTracker";
import UserStatistics from "linguin-shared/components/user/UserStatistics";
import { StoryText, StoryToCollection } from "model/translations";
import { getAvailableStoryDifficultyLevels, getCollectionNames, getStoriesCollections, getStoriesOrderedByCustom } from "util/serverDb";
import StoryListFilterContextProvider from "@linguin-shared/context/storyListFilterContext";
import { Metadata } from "next/types";

async function getPropsForStoryIndexPage() {
    const stories = await getStoriesOrderedByCustom('title', false);
    const allDifficulties = await getAvailableStoryDifficultyLevels();
    const storyIds = stories.map((story: any) => story.id);
    const storyCollections = await getStoriesCollections(storyIds);
    stories.forEach((story: StoryText) =>
        story.collections = storyCollections.filter((collection: StoryToCollection) =>
            collection.storyId == story.id).map((collection: StoryToCollection) =>
                collection.collectionName));

    const randomizedStories = stories.sort(() => Math.random() - 0.5);

    const allCollectionNames = await getCollectionNames().then((collections: any) => collections.map((collection: any) => collection.name));
    return {
        stories: randomizedStories,
        allDifficulties,
        allCollectionNames,
    };
}

async function StoryIndexPage() {
    const propsForStoryIndexPage = await getPropsForStoryIndexPage();
    return (
        <>
            <PurchasedTracker />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    <BrandedWelcome />
                    <UserStatistics />
                    <StoryListFilterContextProvider>
                        <StoryList {...propsForStoryIndexPage as StoryListProps} />
                    </StoryListFilterContextProvider>
                </div>
            </div>
        </>
    );
}

export const metadata: Metadata = {
    title: 'Linguin - Hindi Reading Practice',
    description: 'Improve your Hindi reading! Practice with Stories, Indian Myths and Informational Texts. Instant translations and pronounciation guides. All texts with audio narration. ',
}

export default StoryIndexPage;
