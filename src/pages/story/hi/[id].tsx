import Meta from "components/Meta";
import Story from "components/story/Story";
import { StoryIdContext } from "context/storyIdContext";
import { useRouter } from "next/router";

function StoryPage() {
  const router = useRouter();
  const { id } = router.query;

  return <>
    <Meta title="Story for Hindi Reading Practice" />

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
