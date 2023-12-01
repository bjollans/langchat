import React from "react";
import Meta from "components/Meta";
import Chat from "components/chat/Chat";
import Story from "components/story/Story";
import { useRouter } from "next/router";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

function StoryPage() {
  const router = useRouter();
  const { id } = router.query;

  return <>
    <Meta title="Story" />

    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-12">
      <div className="mx-auto">
        <button onClick={() => router.back()}>
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <Story id={id as string} />
      </div>
    </div>
  </>
}

export default StoryPage;
