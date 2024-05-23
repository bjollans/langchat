import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

export interface StoriesAvailableState {
    storiesAvailable: number;
    setStoriesAvailable: (v: number) => void;
    storiesAvailableLoaded: boolean;
    minStoriesUnlockedAtOnce: number;
}

export const StoriesAvailableContext = createContext<StoriesAvailableState | undefined>(undefined);

export default function StoriesAvailableContextProvider({ children }: { children: React.ReactNode }) {
    const storiesAvailableKey = 'storiesAvailable';
    const minStoriesUnlockedAtOnce = 3;
    const [storiesAvailable, setStoriesAvailableSync] = useState<number>(minStoriesUnlockedAtOnce);
    const [storiesAvailableLoaded, setStoriesAvailableLoaded] = useState<boolean>(false);

    const setStoriesAvailable = async (value: number) => {
        if (value < 0) {
            value = 0;
        }
        setStoriesAvailableSync(value);
        try {
            await AsyncStorage.setItem(storiesAvailableKey, value.toString());
        } catch (e) {
            // saving error
        }
    };

    useEffect(() => {
        const getStoriesAvailable = async () => {
            try {
                const value = await AsyncStorage.getItem(storiesAvailableKey);
                if (value !== null) {
                    setStoriesAvailableSync(parseInt(value));
                }
                setStoriesAvailableLoaded(true);
            } catch (e) {
                setStoriesAvailable(minStoriesUnlockedAtOnce);
                setStoriesAvailableLoaded(true);
            }
        };
        getStoriesAvailable();
    }, []);

    return (
        <StoriesAvailableContext.Provider value={{ storiesAvailable, setStoriesAvailable, storiesAvailableLoaded, minStoriesUnlockedAtOnce }}>
            {children}
        </StoriesAvailableContext.Provider>
    );
}

export function useStoriesAvailableNullable() {
    const context = useContext(StoriesAvailableContext);
    return context;
}

export function useStoriesAvailable() {
    const context = useContext(StoriesAvailableContext);
    if (context === undefined) {
        throw new Error('useStoriesAvailable must be used within a StoriesAvailableContextProvider');
    }
    return context;
}