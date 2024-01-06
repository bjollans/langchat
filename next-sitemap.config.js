module.exports = {
    siteUrl: 'https://www.linguin.co',
    generateRobotsTxt: true,
    exclude: ["https://www.linguin.co/chat"],
    additionalPaths: async (config) => {
        const stories = await fetch("https://linguin.co/api/get-story-pages");
        const storiesJson = await stories.json();
        const storyUrls = storiesJson.urls;
        const result = storyUrls.map((url) => {
            return {
                loc: url,
                changefreq: 'monthly',
                priority: 0.7,
                lastmod: new Date().toISOString(),
            }
        });
        return result;
    }
}