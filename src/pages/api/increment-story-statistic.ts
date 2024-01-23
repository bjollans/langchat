const { getStoryStatistics, upsertStoryStatistics } = require("./_db.js");

interface StoryStatistics {
    id: string;
    views: number;
    opens: number;
    reads: number;
    completes: number;
}

export default async (req, res) => {
    const { id, statName } = req.body;

    if (!id || !statName) {
        return res.status(400).json({ status: "error", message: "Missing id or statName" });
    }
    if (!["views", "opens", "reads", "completes"].includes(statName)) {
        return res.status(400).json({ status: "error", message: "Invalid statName" });
    }

    const stats: StoryStatistics = (await getStoryStatistics(id))[0] ?? {};

    await upsertStoryStatistics(id, {
        ...stats,
        [statName]: (stats[statName] ?? 0) + 1,
    });

    res.status(200).json({ status: "success" });
};
