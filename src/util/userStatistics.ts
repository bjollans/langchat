import { useEffect, useState } from "react";
import { useStory, useUserHasReadStory, userWordsSeen } from "./db";

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

export function useUserStoryStatistics(userId: string, storyId: string): UserStoryStatistics {
    const { data: wordsSeenJson, isSuccess: wordsSeenJsonLoaded } = userWordsSeen(userId);
    const { data: storyReadData, isSuccess: storyReadDataLoaded } = useUserHasReadStory(storyId, userId);
    const { data: story, isSuccess: storyLoaded } = useStory(storyId);

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

        const hasUserAlreadyReadStory: boolean = storyReadData !== undefined && storyReadData[0] !== undefined;
        const wordsSeenSet = new Set<string>(wordsSeenJson ? wordsSeenJson[0].wordsSeen : []);
        const wordsInStory = story!.wordsInStory!;


        const ret: UserStoryStatistics = {
            hasRead: hasUserAlreadyReadStory,
            newWords: 0,
            newWordsPercentage: 0,
            knownWords: 0,
            knownWordsPercentage: 0,
            userWordsSeen: wordsSeenJson ? wordsSeenJson[0].wordsSeen : [],
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
    }, [wordsSeenJson, wordsSeenJsonLoaded, story, storyLoaded, storyReadData, storyReadDataLoaded]);

    return userStoryStatistics;
}



export function useUpdatedUserReadStatistics(userId: string, storyId: string) : UserReadStatistics {
    const userStoryStatistics: UserStoryStatistics = useUserStoryStatistics(userId, storyId);

    const wordsSeenWithWordsInStory = new Set<string>(userStoryStatistics.userWordsSeen);
    userStoryStatistics.wordsInStory.forEach((word: string) => wordsSeenWithWordsInStory.add(word));

    return {
        wordsSeen: Array.from(wordsSeenWithWordsInStory),
        lastUpdatedAt: new Date(),
    }
}