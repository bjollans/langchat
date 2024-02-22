import { StoryFilterChangeCalls, StoryListFilterContext } from "linguin-shared/context/storyListFilterContext";
import { StoryText } from "linguin-shared/model/translations";
import { useContext, useEffect } from "react";
import { useAuth } from "linguin-shared/util/auth";
import { UserStoryStatistics, useUserStoryStatistics } from "linguin-shared/util/userStatistics";
import StoryCompletedCheckMark from "./StoryCompletedCheckMark";
import { useInView } from 'react-intersection-observer';
import { trackStat } from "linguin-shared/util/storyStatistics";
import StoryListElement from "./StoryListElement";

export interface StoryListElementWebProps {
    story: StoryText;
}

export default function StoryListElementWeb(props: StoryListElementWebProps) {
    return (
        <a href={`/story/hi/${props.story.id}`} className="w-full h-full">
            <StoryListElement story={props.story} />
        </a>
    );
}