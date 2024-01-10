import { CheckIcon, NoSymbolIcon } from "@heroicons/react/24/solid";
import Tooltip from "components/Tooltip";
import { useState } from "react";
import { useAuth } from "util/auth";
import { useUserHasReadStory } from "util/db";

export interface StoryCompletedCheckMark {
    storyId: string;
}

export default function StoryCompletedCheckMark(props: StoryCompletedCheckMark) {
    const auth = useAuth();
    const { data: storyReadData } = useUserHasReadStory(props.storyId, auth?.user?.id ?? null);
    const storyRead: boolean = storyReadData !== undefined && storyReadData[0];
    const [showTooltip, setShowTooltip] = useState(false);

    return (<div className="flex items-baseline gap-x-2">
        <Tooltip
            showTooltip={showTooltip}
            setShowTooltip={setShowTooltip}
            tooltip="Read the story to mark it as complete."
        >
            {storyRead
                ? <span className="text-sm font-semibold flex items-center"><CheckIcon className="h-4 w-4 text-green-500 mr-1" />
                    Read</span>
                : <span className="text-xs italic text-slate-300 flex items-center"><NoSymbolIcon className="h-3 w-3 mr-1"/> Not Read</span>}
        </Tooltip>
    </div>
    )
}