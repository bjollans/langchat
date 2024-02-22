import { useState } from "react";
import { Div, Span } from "./RnTwComponents";

interface TooltipProps {
    children: JSX.Element | string;
    tooltip: string;
    showTooltip: boolean;
    setShowTooltip: (showTooltip: boolean) => void;
}

export default function Tooltip(props: TooltipProps) {
    return (
        <Div className="relative">
            {props.showTooltip &&
                <Span onMouseLeave={() => props.setShowTooltip(false)}
                className="absolute inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                    {props.tooltip}
                </Span>
            }
            {props.children}
        </Div>
    );
}