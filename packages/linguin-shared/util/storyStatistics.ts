import { apiRequestMultiPlatform } from "./util";

export const trackStat = async (storyId: string, statName: string) => {
    if (process.env.NODE_ENV === "production" || !__DEV__) {
        await apiRequestMultiPlatform("increment-story-statistic", "POST", {
            id: storyId,
            statName,
        });
    } else {
        console.log("increment-story-statistic", statName, storyId);
    }
};