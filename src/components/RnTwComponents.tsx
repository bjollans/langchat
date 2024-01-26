import { View, Text } from 'react-native';
import { styled } from 'nativewind';


interface DefaultProps {
    children: React.ReactNode;
    className?: string;
}

export function Div({ children, className }: DefaultProps): JSX.Element {
    const StyledView = styled(View, className ?? "");
    return (
        <StyledView>
            {children}
        </StyledView>
    );
}

export function P({ children, className }: DefaultProps): JSX.Element {
    const StyledText = styled(Text, className ?? "");
    return (
        <StyledText>
            {children}
        </StyledText>
    );
}