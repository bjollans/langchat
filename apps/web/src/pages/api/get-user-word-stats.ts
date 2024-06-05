import requireAuth from "./_require-auth.js";

const { getUserStats } = require("./_ddb.ts");

export default requireAuth(async (req, res) => {
    const userId = req.user.id;
    const { date, language } = req.body;
    const stat = await getUserStats(userId, date, language);
    res.status(200).json({ status: "success", data: stat });
});