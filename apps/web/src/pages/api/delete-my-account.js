const requireAuth = require("./_require-auth.js");

export default requireAuth(async (req, res) => {
    res.send({ status: "error", code: "502", message: "Internal Failure" });
});
