import { useState } from "react";
import { Div, Span } from "./RnTwComponents";

interface TooltipProps {
    children: JSX.Element | string;
    tooltip: string;
    showTooltip: boolean;
    setShowTooltip: (showTooltip: boolean) => void;
}

export default function Tooltip(props: TooltipProps) {
    const tooltipStyle = {
        position: "absolute",
        display: "inline-flex",
        alignItems: "center",
        borderRadius: "0.375rem", // rounded-md
        backgroundColor: "#f9fafb", // bg-gray-50
        paddingLeft: "0.5rem", // px-2
        paddingRight: "0.5rem", // px-2
        paddingTop: "0.25rem", // py-1
        paddingBottom: "0.25rem", // py-1
        fontSize: 12, // text-xs
        fontWeight: "500", // font-medium
        color: "#4b5563", // text-gray-600
        boxShadow: "0 0 0 1px rgba(107, 114, 128, 0.1)", // ring-1 ring-inset ring-gray-500/10
        inset: "auto" // cover any default insets with the 'inset' shorthand for 'ring-inset'
    };

    return (
        <Div style={{ position: "relative" }}>
            {props.showTooltip &&
                <Span 
                    onMouseLeave={() => props.setShowTooltip(false)}
                    style={tooltipStyle}
                >
                    {props.tooltip}
                </Span>
            }
            {props.children}
        </Div>
    );
}