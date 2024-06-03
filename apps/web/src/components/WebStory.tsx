"use client";

import { StoryEntity, StoryTranslation } from "@linguin-shared/model/translations";
import { requireAuth } from "@linguin-shared/util/requireAuth";
import Story from "linguin-shared/components/story/Story";
import { useEffect } from "react";
import { useTargetLanguageContext } from "@linguin-shared/context/targetLanguageContext";

export interface WebStoryProps {
  story: StoryEntity;
  storyTranslation: StoryTranslation;
}

function WebStory({ story, storyTranslation }: WebStoryProps) {
  const { updateUserProfile } = useTargetLanguageContext();
  useEffect(() => {
    updateUserProfile({ targetLanguage: "hi" });
  }, []);
  return (
    <Story story={story} storyTranslation={storyTranslation} />
  );
}

export default requireAuth(WebStory);