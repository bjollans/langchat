"use client";

import AsyncStorage from "@react-native-async-storage/async-storage";
import usePostHog from 'linguin-shared/util/usePostHog';
import { createContext, useContext, useEffect, useState } from "react";
import { Language } from "types/language";


export interface TargetLanguageContextType {
    languageToLanguageString: any;
    targetLanguage: Language;
    setTargetLanguage: (language: Language) => void;
}

export const TargetLanguageContext = createContext<TargetLanguageContextType | null>(null);


export interface TargetLanguageContextProviderProps {
    children: React.ReactNode;
}

export default function TargetLanguageContextProvider({ children }: TargetLanguageContextProviderProps): JSX.Element {
    const posthog = usePostHog();
    const [targetLanguage, setTargetLanguage] = useState<Language>("");
    const languageToLanguageString = {
        'hi': '🇮🇳 Hindi',
        'ja': '🇯🇵 Japanese',
        'zh': '🇨🇳 Mandarin',
        'de': '🇩🇪 German',
        'el': '🇬🇷 Greek',
    };

    useEffect(() => {
        if (targetLanguage) {
            AsyncStorage.getItem('targetLanguage').then((savedTargetLanguage) => {
                if (savedTargetLanguage !== targetLanguage) {
                    AsyncStorage.setItem('targetLanguage', targetLanguage);
                    posthog?.capture('target_language_selected', { target_language: targetLanguage });
                }
            });
        }
    }, [targetLanguage]);

    useEffect(() => {
        AsyncStorage.getItem('targetLanguage').then((language) => {
            if (language) {
                setTargetLanguage(language as Language);
            }
        });
    }, []);

    return (
        <TargetLanguageContext.Provider value={{
            languageToLanguageString: languageToLanguageString,
            targetLanguage: targetLanguage,
            setTargetLanguage: setTargetLanguage,
        }}>
            {children}
        </TargetLanguageContext.Provider>
    );
}

export function useTargetLanguageContext(): TargetLanguageContextType {
    const context = useContext(TargetLanguageContext);
    if (context === null) {
        throw new Error('useTargetLanguageContext must be used within a TargetLanguageContextProvider');
    }
    return context;
}