import Meta from "components/Meta";
import { getStory, getStoryCollections, getStoryTranslation, getVisibleStoryIds } from "util/serverDb";
import StoryAudioContextProvider from "linguin-shared/context/storyAudioContext";
import ReadUsageContextProvider from "linguin-shared/context/trackReadContext";
import WebStory from "components/WebStory";

export async function generateStaticParams() {
    const storyIdObjects = await getVisibleStoryIds();
    const params = storyIdObjects.map((storyIdObj) => (
        { id: storyIdObj.id }
    ));
    return params;
}

async function StoryPage({ params }) {
    const { id } = params;
    const storyTranslation = await getStoryTranslation(id);
    const story = await getStory(storyTranslation.storyId);
    const storyCollections = await getStoryCollections(id);
    const storyCollectionNames = (storyCollections as any)?.map((c) => c.collectionName).join(", ");
    return <>
        <Meta title={`Hindi Reading Practice - ${story?.title}`}
            description={`${story?.difficulty} story for Hindi reading practice and listening practice. 
    Improve your Hindi with reading practice with Hindi passages. 
    This one has these categories: ${storyCollectionNames}`}
            noindex={true} />

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto">

                <div className="relative flex z-0">
                    <div className={`p-4 my-4 mb-36 rounded-lg border-1 border-black w-full`}>
                        <ReadUsageContextProvider storyTranslation={storyTranslation}>
                            <StoryAudioContextProvider>
                                <WebStory story={story} storyTranslation={storyTranslation} />
                            </StoryAudioContextProvider>
                        </ReadUsageContextProvider>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default StoryPage;
