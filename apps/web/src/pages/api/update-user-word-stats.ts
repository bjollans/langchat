import { DailyUserReadStat } from "@linguin-shared/model/stats";
import requireAuth from "./_require-auth.js";

const { upsertUserStat } = require("./_ddb.ts");

export default requireAuth(async (req, res) => {
    const { language, wordsSeen, storiesViewed, wordsLookedUp } = req.body; 
    const userId = req.user.id;
    const date = new Date().toISOString().split("T")[0];
    const stat: DailyUserReadStat = {
        userId: userId,
        date: date,
        language: language,
        wordsSeen: wordsSeen ?? [],
        wordsSeenCount: wordsSeen?.length ?? 0,
        wordsLookedUp: wordsLookedUp ?? [],
        wordsLookedUpCount: wordsLookedUp?.length ?? 0,
        storiesViewed: storiesViewed ?? [],
        storiesViewedCount: storiesViewed?.length ?? 0,
        lastUpdatedAt: new Date(),
    }
    await upsertUserStat(stat);
    res.send({ status: "success" });
});
