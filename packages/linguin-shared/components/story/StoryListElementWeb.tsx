import { StoryFilterChangeCalls, StoryListFilterContext } from "linguin-shared/context/storyListFilterContext";
import { StoryListEntity } from "linguin-shared/model/translations";
import { useContext, useEffect } from "react";
import { useAuth } from "linguin-shared/util/auth";
import { UserStoryStatistics, useUserStoryStatistics } from "linguin-shared/util/userStatistics";
import StoryCompletedCheckMark from "./StoryCompletedCheckMark";
import { useInView } from 'react-intersection-observer';
import { trackStat } from "linguin-shared/util/storyStatistics";
import StoryListElement from "./StoryListElement";
import { Language } from "linguin-shared/types/language";

export interface StoryListElementWebProps {
    storyListEntity: StoryListEntity;
    language: Language;
}

export default function StoryListElementWeb(props: StoryListElementWebProps) {
    return (
        <a 
            href={`/story/${props.language}/${props.storyListEntity.storyTranslationId}`} 
            style={{ width: '100%', height: '100%' }}
        >
            <StoryListElement storyListEntity={props.storyListEntity} />
        </a>
    );
}