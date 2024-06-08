import { useState } from "react";

interface TooltipButtonProps {
    children: JSX.Element;
    disabledTooltip: string;
    disabled?: boolean;
    onClick: () => void;
}

export default function TooltipButton(props: TooltipButtonProps) {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleClick = () => {
        if (props.disabled) {
            setShowTooltip(true);
        } else {
            props.onClick();
        }
    }

    return (
        <div style={{ position: "relative" }}>
            {showTooltip &&
                <span
                onMouseLeave={() => setShowTooltip(false)}
                style={{
                    position: "absolute",
                    display: "inline-flex",
                    alignItems: "center",
                    borderRadius: "0.375rem", // rounded-md
                    backgroundColor: "#f9fafb", // bg-gray-50
                    paddingLeft: "0.5rem", // px-2
                    paddingRight: "0.5rem", // px-2
                    paddingTop: "0.25rem", // py-1
                    paddingBottom: "0.25rem", // py-1
                    fontSize: "0.75rem", // text-xs
                    fontWeight: "500", // font-medium
                    color: "#4b5563", // text-gray-600
                    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)", // ring-1 ring-inset ring-gray-500/10
                }}>
                    {props.disabledTooltip}
                </span>
            }
            <button onClick={handleClick} style={{ cursor: props.disabled ? "default" : "pointer" }}>
                {props.children}
            </button>
        </div>
    );
}