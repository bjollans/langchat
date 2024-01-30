import Meta from "components/Meta";
import Story from "components/story/Story";
import { StoryIdContext } from "context/storyIdContext";
import { StoryText } from "model/translations";
import { getStory, getStoryCollections, getVisibleStoryIds } from "util/db";


export async function getStaticProps({ params }) {
  const story = await getStory(params.id);
  const storyCollections = await getStoryCollections(params.id);
  const storyCollectionNames = (storyCollections as any)?.map((c) => c.collectionName).join(", ");
  return { props: { story, storyCollectionNames } };
}

export async function getStaticPaths() {
  const storyIdObjects = await getVisibleStoryIds();
  const paths = storyIdObjects.map((storyIdObj) => ({
    params: { id: storyIdObj.id },
  }))
  return { paths, fallback: false };
}

interface StoryPageProps {
  story: StoryText;
  storyCollectionNames: string[];
}

function StoryPage({ story, storyCollectionNames }: StoryPageProps) {
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
            <Story story={story} />
          </div>
        </div>
      </div>
    </div>
  </>
}

export default StoryPage;
