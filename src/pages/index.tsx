import StoryIndexPage, { getServerSidePropsForStoryIndexPage } from "./story/hi";

export async function getServerSideProps() {
  return getServerSidePropsForStoryIndexPage();
}

export default StoryIndexPage;
