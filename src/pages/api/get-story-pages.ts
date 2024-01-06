const { getStoryIdsByLanguage } = require("./_db.js");

export default async (req, res) => {
    try {
        const stories = await getStoryIdsByLanguage("hi");

        const urls = stories.map((story) => {
            return `/story/hi/${story.id}`;
        });

        // Return success response
        res.status(200).json({ status: "success", urls });
    } catch (error: any) {
        console.log("stripe-create-billing-session error", error);

        // Return error response
        res.send({ status: "error", code: error.code, message: error.message });
    }
};
