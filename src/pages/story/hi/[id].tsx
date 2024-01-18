import Meta from "components/Meta";
import Story from "components/story/Story";
import { StoryIdContext } from "context/storyIdContext";
import { useRouter } from "next/router";
import { useStory, useStoryCollections } from "util/db";

function StoryPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data: story } = useStory(id as string);
  const { data: collections } = useStoryCollections(id as string);

  const collectionsAsStrings = (collections as any)?.map((c) => c.collectionName).join(", ");

  return <>
    <Meta title={`Hindi Reading Practice - ${story?.title}`}
      description={`${story?.difficulty} story for Hindi reading practice and listening practice. 
    Improve your Hindi with reading practice with Hindi passages. 
    This one has these categories: ${collectionsAsStrings}`}
      noindex={true} />

    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto">
        <StoryIdContext.Provider value={id as string}>
          <Story id={id as string} />
        </StoryIdContext.Provider>
      </div>
    </div>
  </>
}

export default StoryPage;
