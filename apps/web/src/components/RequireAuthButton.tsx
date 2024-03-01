import { useAuth } from "util/auth";
import TooltipButton from "linguin-shared/components/TooltipButton";

interface RequireAuthButtonProps {
    onClick: () => void,
    noAuthText: string,
    className: string,
    children: JSX.Element,
}

function RequireAuthButton (props: RequireAuthButtonProps) {
    const auth = useAuth();

    return (
        <TooltipButton
        disabled={!(auth.user)}
        onClick={props.onClick}
        disabledTooltip={props.noAuthText}
        disabledClassName="bg-slate-500 hover:bg-slate-500"
        className={props.className}
    >
        {props.children}
    </TooltipButton>
    );
}

export default RequireAuthButton;