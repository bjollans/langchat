import { createContext, useContext, useEffect, useState } from "react";

export interface StoryAudioContextType {
    isPlayingAudio: boolean;
    setIsPlayingAudio: (isPlayingAudio: boolean) => void;
    hasPlayedAudio: boolean;
    setHasPlayedAudio: (hasPlayedAudio: boolean) => void;
    currentAudioTime: number;
    setCurrentAudioTime: (currentAudioTime: number) => void;
}

export const StoryAudioContext = createContext<StoryAudioContextType | null>(null);


export interface StoryAudioContextProviderProps {
    children: React.ReactNode;
}

export default function StoryAudioContextProvider({ children }: StoryAudioContextProviderProps): JSX.Element {
    const [currentAudioTime, setCurrentAudioTime] = useState(0);
    const [isPlayingAudio, setIsPlayingAudio] = useState(false);
    const [hasPlayedAudio, setHasPlayedAudio] = useState(false);

    useEffect(() => {
        if (isPlayingAudio) setHasPlayedAudio(true);
    }, [isPlayingAudio]);

    return (
        <StoryAudioContext.Provider value={{
            currentAudioTime,
            setCurrentAudioTime,
            isPlayingAudio,
            setIsPlayingAudio,
            hasPlayedAudio,
            setHasPlayedAudio
        }}>
            {children}
        </StoryAudioContext.Provider>
    );
}

export function useStoryAudioContext(): StoryAudioContextType {
    const context = useContext(StoryAudioContext);
    if (context === null) {
        throw new Error('useStoryAudioContext must be used within a StoryAudioContextProvider');
    }
    return context;
}