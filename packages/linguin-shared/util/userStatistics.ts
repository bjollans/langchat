import { useEffect, useState } from "react";
import { useStoryTranslations, useStory, useUserHasReadStory, useUserStoriesRead, userWordsSeen, useStoryTranslationFromStoryIdAndLanguage } from "./clientDb";
import { useTargetLanguageContext } from "linguin-shared/context/targetLanguageContext";

export interface UserReadStatistics {
    wordsSeen: string[];
    lastUpdatedAt: Date;
}

export interface UserStoryStatistics {
    hasRead: boolean,
    newWords: number,
    newWordsPercentage: number,
    knownWords: number,
    knownWordsPercentage: number,
    userWordsSeen: string[],
    wordsInStory: string[],
}

// isInSingleStoryContext => If I am loading the same thing for many stories in one page, 
//                           I want to just make one bulk request for all stories
//                           This makes the code slightly less readable, but a lot more performant.
export function useUserStoryStatistics({ userId, storyId, isInSingleStoryContext = false }): UserStoryStatistics {
    const { userProfile } = useTargetLanguageContext();
    const { data: wordsSeenJson, isSuccess: wordsSeenJsonLoaded } = userWordsSeen(userId, userProfile.targetLanguage);
    const { data: storyReadData, isSuccess: storyReadDataLoaded } = isInSingleStoryContext ? useUserHasReadStory(storyId, userId) : useUserStoriesRead(userId);
    const { data: storyTranslationData, isSuccess: storyLoaded } = isInSingleStoryContext ? useStoryTranslationFromStoryIdAndLanguage(storyId, userProfile.targetLanguage) : useStoryTranslations({language: userProfile.targetLanguage});
    const storyTranslation = isInSingleStoryContext
        ? storyTranslationData
        : storyTranslationData?.find((storyTranslation) => storyTranslation.storyId === storyId);

    const [userStoryStatistics, setUserStoryStatistics] = useState<UserStoryStatistics>({
        hasRead: false,
        newWords: 0,
        newWordsPercentage: 0,
        knownWords: 0,
        knownWordsPercentage: 0,
        userWordsSeen: [],
        wordsInStory: [],
    });

    useEffect(() => {
        if (!wordsSeenJsonLoaded || !storyLoaded || !storyReadDataLoaded) return;

        const hasUserAlreadyReadStory: boolean = storyReadData.filter((storyReadData) => storyReadData.storyId === storyId).length > 0;
        const wordsSeenSet = new Set<string>(wordsSeenJson && wordsSeenJson[0] ? wordsSeenJson[0].wordsSeen : []);
        const wordsInStory = storyTranslation?.wordsInStory || [];


        const ret: UserStoryStatistics = {
            hasRead: hasUserAlreadyReadStory,
            newWords: 0,
            newWordsPercentage: 0,
            knownWords: 0,
            knownWordsPercentage: 0,
            userWordsSeen: wordsSeenJson && wordsSeenJson[0] ? wordsSeenJson[0].wordsSeen : [],
            wordsInStory: wordsInStory,
        };

        wordsInStory.forEach((word: string) => {
            if (wordsSeenSet.has(word)) {
                ret.knownWords++;
            } else {
                ret.newWords++;
            }
        });

        ret.newWordsPercentage = Math.floor(100 * ret.newWords / wordsInStory.length);
        ret.knownWordsPercentage = Math.floor(100 * ret.knownWords / wordsInStory.length);

        setUserStoryStatistics(ret);
    }, [wordsSeenJson, wordsSeenJsonLoaded, storyTranslation, storyLoaded, storyReadData, storyReadDataLoaded]);

    return userStoryStatistics;
}



export function useUpdatedUserReadStatistics(userId: string, storyId: string): UserReadStatistics {
    const userStoryStatistics: UserStoryStatistics = useUserStoryStatistics({ userId, storyId, isInSingleStoryContext: true });

    const wordsSeenWithWordsInStory = new Set<string>(userStoryStatistics.userWordsSeen);
    userStoryStatistics.wordsInStory.forEach((word: string) => wordsSeenWithWordsInStory.add(word));

    return {
        wordsSeen: Array.from(wordsSeenWithWordsInStory),
        lastUpdatedAt: new Date(),
    }
}