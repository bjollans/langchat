import { apiRequest } from "./util";

export const trackStat = async (storyId: string, statName: string) => {
    if (process.env.NODE_ENV === "production" || !__DEV__) {
        await apiRequest("increment-story-statistic", "POST", {
            id: storyId,
            statName,
        });
    } else {
        console.log("increment-story-statistic", statName, storyId);
    }
};