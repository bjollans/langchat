
"use client";

import { createContext, useContext } from 'react';

export const FuriganaContext = createContext<FuriganaContextType | null>(null);

export interface FuriganaContextType {
    hasFurigana: boolean;
}

export interface FuriganaContextProviderProps {
    children: React.ReactNode;
    hasFurigana: boolean;
}

export default function FuriganaContextProvider({ children, hasFurigana }: FuriganaContextProviderProps): JSX.Element {

    return (
        <FuriganaContext.Provider value={{ hasFurigana: hasFurigana }}>
            {children}
        </FuriganaContext.Provider>
    );
}

export function useFuriganaContext(): FuriganaContextType {
    const context = useContext(FuriganaContext);
    if (context === null) {
        throw new Error('useFuriganaContext must be used within a FuriganaContextProvider');
    }
    return context;
}