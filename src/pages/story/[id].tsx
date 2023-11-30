import React from "react";
import Meta from "components/Meta";
import Chat from "components/chat/Chat";
import Story from "components/story/Story";
import { useRouter } from "next/router";

function StoryPage() {
  const router = useRouter();
  const { id } = router.query;
  
  return <>
    <Meta title="Story" />
    <Story id={id as string} />
  </>
}

export default StoryPage;
