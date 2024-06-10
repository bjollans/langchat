"use client";

import { useAuth } from "linguin-shared/util/auth";
import { getUserProfile, updateUserProfileDb } from "linguin-shared/util/clientDb";
import usePostHog from 'linguin-shared/util/usePostHog';
import { LinguinUserProfile } from "model/user";
import { createContext, useContext, useEffect, useState } from "react";


export interface UserProfileContextType {
    availableLanguagesMap: Record<string, any>;
    userProfile: LinguinUserProfile;
    updateUserProfile: (userProfile: any) => void;
}

export const UserProfileContext = createContext<UserProfileContextType | null>(null);


export interface UserProfileContextProviderProps {
    children: React.ReactNode;
}

export default function UserProfileContextProvider({ children }: UserProfileContextProviderProps): JSX.Element {
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
        <UserProfileContext.Provider value={{
            availableLanguagesMap: languageToLanguageString,
            userProfile: userProfile,
            updateUserProfile: updateUserProfile,
        }}>
            {children}
        </UserProfileContext.Provider>
    );
}

export function useUserProfileContext(): UserProfileContextType {
    const context = useContext(UserProfileContext);
    if (context === null) {
        throw new Error('useUserProfileContext must be used within a UserProfileContextProvider');
    }
    return context;
}