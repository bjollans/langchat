"use client";

import { useUserProfileContext } from "linguin-shared/context/userProfileContext";
import { Div, P } from "linguin-shared/components/RnTwComponents";
import { useAuth } from "linguin-shared/util/auth";
import { useUserStoriesRead, userWordsSeen } from "linguin-shared/util/clientDb";

export default function UserStatistics() {
    const auth = useAuth();
    const { userProfile, availableLanguagesMap } = useUserProfileContext();
    const { data: wordsSeenJson } = userWordsSeen(auth?.user?.uid, userProfile.targetLanguage);
    const { data: storiesRead } = useUserStoriesRead(auth?.user?.uid);
    const wordsSeen = wordsSeenJson?.length > 0 && wordsSeenJson[0] ? wordsSeenJson[0]?.wordsSeen : [];

    return <Div className="mt-1 mb-2">
        <P className="mx-auto text-center text-md italic leading-6 font-medium text-gray-900">
            {wordsSeen?.length} Words Seen for {availableLanguagesMap[userProfile.targetLanguage]}.
        </P>
    </Div>;
}