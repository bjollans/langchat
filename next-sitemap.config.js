module.exports = {
    siteUrl: 'https://www.linguin.co',
    generateRobotsTxt: true,
    exclude: ["https://www.linguin.co/chat"],
    additionalPaths: async (config) => {
        const stories = await fetch("https://linguin.co/api/get-story-pages");
        const storiesJson = await stories.json();
        const storyUrls = storiesJson.urls;
        return storyUrls;
    }
  }