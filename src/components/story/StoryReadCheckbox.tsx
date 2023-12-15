import Tooltip from "components/Tooltip";
import { useEffect, useState } from "react";
import { useAuth } from "util/auth";
import { markUserStoryRead, unmarkUserStoryRead, useUserHasReadStory } from "util/db";

export interface StoryReadCheckBoxProps {
    storyId: string;
}

export default function StoryReadCheckBox(props: StoryReadCheckBoxProps) {
    const auth = useAuth();
    const { data: storyRead } = useUserHasReadStory(props.storyId, auth?.user?.id ?? null);
    const [storyReadChecked, setStoryReadChecked] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        setStoryReadChecked(storyRead !== undefined ? storyRead[0] ?? false : false);
    }, [storyRead]);

    function handleCheckboxClick() {
        if (!auth.user) {
            setShowTooltip(true);
            return;
        }
        if (storyReadChecked) {
            setStoryReadChecked(false);
            unmarkUserStoryRead(props.storyId, auth?.user?.id);
        } else {
            setStoryReadChecked(true);
            markUserStoryRead(props.storyId, auth?.user?.id);
        }
    }

    return (<div className="flex items-baseline gap-x-2">
        <Tooltip
            showTooltip={showTooltip}
            setShowTooltip={setShowTooltip}
            tooltip="Login to mark as read"
        >
            <input type="checkbox" checked={storyReadChecked} onChange={handleCheckboxClick} className="focus:ring-0" />
        </Tooltip>
        <span className="text-xs italic">{storyReadChecked ? "Read" : "Not Read"}</span>
    </div>
    )
}