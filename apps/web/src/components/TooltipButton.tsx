import { useState } from "react";

interface TooltipButtonProps {
    children: JSX.Element;
    disabledClassName?: string;
    className?: string;
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

    var className = props.className ?? "";
    if (props.disabled) {
        className += " " + (props.disabledClassName ?? "") + " cursor-default";
    }

    return (
        <div className="relative">
            {showTooltip &&
                <span onMouseLeave={() => setShowTooltip(false)}
                className="absolute inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                    {props.disabledTooltip}
                </span>
            }
            <button onClick={handleClick} className={className}>
                {props.children}
            </button>
        </div>
    );
}