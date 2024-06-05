import Meta from "components/Meta";
import BrandedWelcome from "components/brand/BrandedWelcome";
import StoryList, { StoryListProps } from "components/story/StoryList";
import PurchasedTracker from "components/tracking/PurchasedTracker";
import UserStatistics from "linguin-shared/components/user/UserStatistics";
import { StoryListEntity, StoryToCollection } from "model/translations";
import { getAvailableStoryDifficultyLevels, getCollectionNames, getStoriesCollections, getStoryList } from "util/serverDb";
import StoryListFilterContextProvider from "@linguin-shared/context/storyListFilterContext";
import { Metadata } from "next/types";
import { Language } from "@linguin-shared/types/language";


export async function generateStaticParams() {
    return [
        { language: "hi" },
        { language: "ja" },
        { language: "zh" },
        { language: "de" },
        { language: "el" },
    ];
}


async function getPropsForStoryIndexPage(language: Language) {
    const storyListEntities = await getStoryList(language);
    const allDifficulties = await getAvailableStoryDifficultyLevels();
    const storyIds = storyListEntities.map((story: any) => story.id);
    const storyCollections = await getStoriesCollections(storyIds);
    storyListEntities.forEach((story: StoryListEntity) =>
        story.collections = storyCollections.filter((collection: StoryToCollection) =>
            collection.storyId == story.id).map((collection: StoryToCollection) =>
                collection.collectionName));

    const allCollectionNames = await getCollectionNames().then((collections: any) => collections.map((collection: any) => collection.name));

    return {
        language,
        storyListEntities,
        allDifficulties,
        allCollectionNames,
    };
}

async function StoryIndexPage({ params }) {
    const { language } = params;
    const propsForStoryIndexPage = await getPropsForStoryIndexPage(language);
    return (
        <>
            <PurchasedTracker />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    <BrandedWelcome />
                    <UserStatistics language={language} />
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
