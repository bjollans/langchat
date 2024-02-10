import Meta from "components/Meta";
import BrandedWelcome from "components/brand/BrandedWelcome";
import StoryList, { StoryListProps } from "components/story/StoryList";
import PurchasedTracker from "components/tracking/PurchasedTracker";
import UserStatistics from "components/user/UserStatistics";
import { StoryText, StoryToCollection } from "model/translations";
import { getAvailableStoryDifficultyLevels, getCollectionNames, getStoriesCollections, getStoriesOrderedByCustom } from "util/serverDb";

async function getPropsForStoryIndexPage() {
    const stories = await getStoriesOrderedByCustom('title', false);
    const filterDifficulties = await getAvailableStoryDifficultyLevels();
    const storyIds = stories.map((story: any) => story.id);
    const storyCollections = await getStoriesCollections(storyIds);
    stories.forEach((story: StoryText) =>
        story.collections = storyCollections.filter((collection: StoryToCollection) =>
            collection.storyId == story.id).map((collection: StoryToCollection) =>
                collection.collectionName));
    
    const randomizedStories = stories.sort(() => Math.random() - 0.5);

    const filterCollectionNames = await getCollectionNames().then((collections: any) => collections.map((collection: any) => collection.name));
    return {
            stories: randomizedStories,
            filterDifficulties,
            filterCollectionNames,
        };
}

async function StoryIndexPage() {
    const propsForStoryIndexPage = await getPropsForStoryIndexPage();
    return (
        <>
            <Meta title="Linguin - Hindi Reading Practice" />
            <PurchasedTracker />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    <BrandedWelcome />
                    <UserStatistics />
                    <StoryList {...propsForStoryIndexPage as StoryListProps} />
                </div>
            </div>
        </>
    );
}

export default StoryIndexPage;
