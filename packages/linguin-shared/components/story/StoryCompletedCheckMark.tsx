import { CheckIcon, NoSymbolIcon } from "@heroicons/react/24/solid";
import Tooltip from "linguin-shared/components/Tooltip";
import { useState } from "react";
import { useAuth } from "linguin-shared/util/auth";
import { UserStoryStatistics, useUserStoryStatistics } from "linguin-shared/util/userStatistics";

export interface StoryCompletedCheckMark {
    storyId: string;
}

export default function StoryCompletedCheckMark(props: StoryCompletedCheckMark) {
    const auth = useAuth();
    const userStoryStatistics: UserStoryStatistics = useUserStoryStatistics({userId: auth?.user?.id, storyId: props.storyId});
    const [showTooltip, setShowTooltip] = useState(false); 

    return (<div className="flex items-baseline gap-x-2">
        <Tooltip
            showTooltip={showTooltip}
            setShowTooltip={setShowTooltip}
            tooltip="Read the story to mark it as complete."
        >
            {userStoryStatistics.hasRead
                ? <span className="text-sm font-semibold flex items-center"><CheckIcon className="h-4 w-4 text-green-500 mr-1" />
                    Read</span>
                : <span className="text-xs italic text-slate-300 flex items-center"><NoSymbolIcon className="h-3 w-3 mr-1"/> Not Read</span>}
        </Tooltip>
    </div>
    )
}