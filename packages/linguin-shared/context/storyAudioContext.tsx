"use client";

import { createContext, useContext, useEffect, useState } from "react";

export interface StoryAudioContextType {
    hasPlayedAudio: boolean;
    setHasPlayedAudio: (hasPlayedAudio: boolean) => void;
    updateIsPlayingAudio: (isPlayingAudio: boolean) => void;
    addIsPlayingAudioUpdateFunction: (isPlayingAudioUpdateFunction: (isPlayingAudio: boolean) => void) => void;
    updateAudioTimes: ((audioTime: number) => void);
    addAudioTimeUpdateFunction: (audioTimeUpdateFunction: (audioTime: number) => void) => void;
}

export const StoryAudioContext = createContext<StoryAudioContextType | null>(null);


export interface StoryAudioContextProviderProps {
    children: React.ReactNode;
}

export default function StoryAudioContextProvider({ children }: StoryAudioContextProviderProps): JSX.Element {
    const [isPlayingAudioUpdateFunctions] = useState<((isPlayingAudio: boolean) => void)[]>([]);
    const [hasPlayedAudio, setHasPlayedAudio] = useState(false);
    const [audioTimeUpdateFunctions] = useState<((audioTime: number) => void)[]>([]);


    const addIsPlayingAudioUpdateFunction = (isPlayingAudioUpdateFunction: (isPlayingAudio: boolean) => void) => {
        isPlayingAudioUpdateFunctions.push(isPlayingAudioUpdateFunction);
    }

    const updateIsPlayingAudio = (isPlayingAudio: boolean) => {
        isPlayingAudioUpdateFunctions.forEach((isPlayingAudioUpdateFunction) => isPlayingAudioUpdateFunction(isPlayingAudio));
    }

    const addAudioTimeUpdateFunction = (audioTimeUpdateFunction: (audioTime: number) => void) => {
        audioTimeUpdateFunctions.push(audioTimeUpdateFunction);
    }

    const updateAudioTimes = (audioTime: number) => {
        audioTimeUpdateFunctions.forEach((audioTimeUpdateFunction) => audioTimeUpdateFunction(audioTime));
    }

    return (
        <StoryAudioContext.Provider value={{
            updateIsPlayingAudio,
            addIsPlayingAudioUpdateFunction,
            hasPlayedAudio,
            setHasPlayedAudio,
            updateAudioTimes,
            addAudioTimeUpdateFunction
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