import { createContext, useContext, useEffect, useState } from "react";
import { Pressable } from "react-native";

export interface RnTouchableContextType {
    addToResetterFunctions: (resetterFunction: () => void) => void;
}

export const RnTouchableContext = createContext<RnTouchableContextType | null>(null);


export interface RnTouchableContextProviderProps {
    children: React.ReactNode;
}

export default function RnTouchableContextProvider({ children }: RnTouchableContextProviderProps): JSX.Element {
    var [longPressHappened] = useState(false);
    var [resetterFunctions] = useState<(() => void)[]>([]);

    const addToResetterFunctions = (resetterFunction: () => void) => {
        resetterFunctions.push(resetterFunction);
    }

    return (
        <RnTouchableContext.Provider value={{
            addToResetterFunctions
        }}>
            <Pressable
                onPressIn={() => longPressHappened = false}
                onPressOut={() => {
                    if (!longPressHappened) {
                        resetterFunctions.forEach((resetterFunction) => resetterFunction());
                        resetterFunctions = [];
                    }
                }}
                onLongPress={() => longPressHappened = true}
                delayLongPress={300}
                style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'transparent'
                }}>
                {children}
            </Pressable>
        </RnTouchableContext.Provider>
    );
}

export function useRnTouchableContext(): RnTouchableContextType {
    const context = useContext(RnTouchableContext);
    if (context === null) {
        return {
            addToResetterFunctions: () => { }
        }
    }
    return context;
}