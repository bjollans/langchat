"use client";

import { useUserProfileContext } from "linguin-shared/context/userProfileContext";
import { Div, P } from "linguin-shared/components/RnTwComponents";
import { useAuth } from "linguin-shared/util/auth";
import { useUserStoriesRead, userWordsSeen } from "linguin-shared/util/clientDb";
import { Language } from "linguin-shared/types/language";

export interface UserStatisticsProps {
    language: Language;
}

export default function UserStatistics({language}) {
    const auth = useAuth();
    const { userProfile, availableLanguagesMap } = useUserProfileContext();
    const { data: wordsSeenJson } = userWordsSeen(auth?.user?.uid, language);
    const { data: storiesRead } = useUserStoriesRead(auth?.user?.uid);
    const wordsSeen = wordsSeenJson?.length > 0 && wordsSeenJson[0] ? wordsSeenJson[0]?.wordsSeen : [];

    return (
        <Div style={{ marginTop: 4, marginBottom: 8 }}>
            <P style={{
                marginLeft: 'auto', 
                marginRight: 'auto', 
                textAlign: 'center', 
                fontSize: 16, 
                fontStyle: 'italic', 
                lineHeight: 24, 
                fontWeight: '500', 
                color: '#1F2937'  // Tailwind gray-900
            }}>
                {wordsSeen?.length} Words Seen for {availableLanguagesMap[language]}.
            </P>
        </Div>
    );
}