"use client";

import { useUserProfileContext } from "linguin-shared/context/userProfileContext";
import { Div, P } from "linguin-shared/components/RnTwComponents";
import { useAuth } from "linguin-shared/util/auth";
import { useUserStoriesRead, userWordsSeen } from "linguin-shared/util/clientDb";
import { Language } from "linguin-shared/types/language";
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import {Platform} from 'react-native';

export interface UserStatisticsProps {
    language: Language;
}

export default function UserStatistics({language}) {
    const auth = useAuth();
    const { userProfile, availableLanguagesMap } = useUserProfileContext();
    const { data: wordsSeenJson } = userWordsSeen(auth?.user?.uid, language);
    const { data: storiesRead } = useUserStoriesRead(auth?.user?.uid);
    const wordsSeen = wordsSeenJson?.length > 0 && wordsSeenJson[0] ? wordsSeenJson[0]?.wordsSeen : [];
    const { styles } = useStyles(stylesheet);

    return (
        <Div style={styles.container}>
            <P style={styles.text}>
                {wordsSeen?.length} Words Seen for {availableLanguagesMap[language]}.
            </P>
        </Div>
    );
}

const stylesheet = createStyleSheet((theme: any) => ({
    container: { marginTop: 4, marginBottom: 8 },
    text: {
        marginLeft: 'auto', 
        marginRight: 'auto', 
        textAlign: 'center', 
        fontSize: 16, 
        fontStyle: 'italic', 
        lineHeight: Platform.OS == "web" ? 2 : 24, 
        fontWeight: '500', 
        color: '#1F2937'  // Tailwind gray-900
    },
}));