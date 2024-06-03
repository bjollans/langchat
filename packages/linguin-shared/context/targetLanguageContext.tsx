"use client";

import LanguageChooseModal from "linguin-shared/components/LanguageChooseModal";
import usePostHog from 'linguin-shared/util/usePostHog';
import { LinguinUserProfile } from "model/user";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "linguin-shared/util/auth";
import { getUserProfile, updateUserProfileDb } from "linguin-shared/util/clientDb";


export interface TargetLanguageContextType {
    availableLanguagesMap: any;
    userProfile: LinguinUserProfile;
    updateUserProfile: (userProfile: any) => void;
    setLanguageChooseModalVisible: (visible: boolean) => void;
}

export const TargetLanguageContext = createContext<TargetLanguageContextType | null>(null);


export interface TargetLanguageContextProviderProps {
    children: React.ReactNode;
}

export default function TargetLanguageContextProvider({ children }: TargetLanguageContextProviderProps): JSX.Element {
    const posthog = usePostHog();
    const auth = useAuth();
    const [userProfile, setUserProfile] = useState<LinguinUserProfile>({
        targetLanguage: "",
    });
    function updateUserProfile(data) {
        const newUserProfile = { ...userProfile, ...data };
        setUserProfile(newUserProfile);
        if (auth && auth.user) {
            updateUserProfileDb(auth.user.id, newUserProfile);
        }
    }
    const [languageChooseModalVisible, setLanguageChooseModalVisible] = useState<boolean>(false);
    const languageToLanguageString = {
        'hi': '🇮🇳 Hindi',
        'ja': '🇯🇵 Japanese',
        'zh': '🇨🇳 Mandarin',
        'de': '🇩🇪 German',
        'el': '🇬🇷 Greek',
    };

    async function pullUserProfileFromDB() {
        setUserProfile(await getUserProfile(auth.user.id));
    }

    useEffect(() => {
        if (auth && auth.user) {
            pullUserProfileFromDB();
        }
    }, [auth, auth.user]);

    return (
        <TargetLanguageContext.Provider value={{
            availableLanguagesMap: languageToLanguageString,
            userProfile: userProfile,
            setLanguageChooseModalVisible: setLanguageChooseModalVisible,
            updateUserProfile: updateUserProfile,
        }}>
            <LanguageChooseModal
                visible={languageChooseModalVisible}
                close={() => {
                    setLanguageChooseModalVisible(false);
                }}
            />
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