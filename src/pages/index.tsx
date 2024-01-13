import StoryIndexPage, { getPropsForStoryIndexPage } from "./story/hi";

export async function getStaticProps() {
  return getPropsForStoryIndexPage();
}

export default StoryIndexPage;
