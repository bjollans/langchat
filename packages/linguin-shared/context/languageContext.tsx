
"use client";

import { createContext, useContext } from "react";
import { Language } from "linguin-shared/types/language";


export interface LanguageContextType {
    language: Language;
}

export const LanguageContext = createContext<LanguageContextType | null>(null);


export interface LanguageContextProviderProps {
    children: React.ReactNode;
    language: Language;
}

export default function LanguageContextProvider({ children, language }: LanguageContextProviderProps): JSX.Element {

    return (
        <LanguageContext.Provider value={{
            language: language,
        }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguageContext(): LanguageContextType {
    const context = useContext(LanguageContext);
    if (context === null) {
        throw new Error('useLanguageContext must be used within a LanguageContextProvider');
    }
    return context;
}