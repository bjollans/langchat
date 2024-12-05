import { NoSymbolIcon } from "@heroicons/react/24/solid";
import Tooltip from "linguin-shared/components/Tooltip";
import { useState } from "react";
import { useAuth } from "linguin-shared/util/auth";
import { UserStoryStatistics, useUserStoryStatistics } from "linguin-shared/util/userStatistics";
import { Div, Span } from "linguin-shared/components/RnTwComponents";
import { Platform } from "react-native";
import Svg, { Path } from "react-native-svg";
import { CheckIcon } from "linguin-shared/components/Icons";

export interface StoryCompletedCheckMark {
    storyId: string;
}

export default function StoryCompletedCheckMark(props: StoryCompletedCheckMark) {
    const auth = useAuth();
    const userStoryStatistics: UserStoryStatistics = useUserStoryStatistics({ userId: auth?.user?.id, storyId: props.storyId });
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <Div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', gap: 8, marginLeft: 8 }}>
            <Tooltip
                showTooltip={showTooltip}
                setShowTooltip={setShowTooltip}
                tooltip="Read the story to mark it as complete."
            >
                {userStoryStatistics.hasRead
                    ? <Span style={{ fontSize: 14, fontWeight: '600', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <CheckIcon />
                        Read
                      </Span>
                    : <Span style={{
                          fontSize: Platform.OS == "web" ? 12 : 14,
                          fontStyle: 'italic',
                          color: '#cbd5e1',
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center'
                      }}>
                          <_NoSymbolIcon />
                          Not Read
                      </Span>}
            </Tooltip>
        </Div>
    )
}

function _NoSymbolIcon() {
    return Platform.OS === 'web' ? 
        <NoSymbolIcon style={{ height: 12, width: 12, marginRight: 4 }} /> : 
        <Svg height="12" viewBox="0 -960 960 960" width="12">
            <Path fill="#cbd5e1" d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q54 0 104-17.5t92-50.5L228-676q-33 42-50.5 92T160-480q0 134 93 227t227 93Zm252-124q33-42 50.5-92T800-480q0-134-93-227t-227-93q-54 0-104 17.5T284-732l448 448Z" />
        </Svg>
}