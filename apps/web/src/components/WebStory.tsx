"use client";

import { requireAuth } from "@linguin-shared/util/requireAuth";
import Story from "components/story/Story";

function WebStory({story}) {
  return (
    <Story story={story} />
  );
}

export default requireAuth(WebStory);