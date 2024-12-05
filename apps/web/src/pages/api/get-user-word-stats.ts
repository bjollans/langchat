import requireAuth from "./_require-auth.js";
import allowCors from "./_allow-cors.js";

const { getUserStats } = require("./_ddb.ts");

export default allowCors(requireAuth(async (req, res) => {
    const userId = req.user.id;
    const { date, language } = req.body;
    const stat = await getUserStats(userId, date, language);
    res.status(200).json({ status: "success", data: stat });
}));