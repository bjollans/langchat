import { getStoriesOrderedByCustom } from "util/db";
import StoryIndexPage from "./story/hi";

export async function getServerSideProps() {
  const stories = await getStoriesOrderedByCustom('title', false);
  return {
      props: {
          stories
      }
  };
}

export default StoryIndexPage;
