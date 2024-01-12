import Analytics from "analytics";
import mixpanelPlugin from "@analytics/mixpanel";
import googleTagManager from '@analytics/google-tag-manager'
import Router from "next/router";

// Initialize analytics and plugins
// Documentation: https://getanalytics.io
const analytics = Analytics({
  debug: process.env.NODE_ENV !== "production",
  plugins: [
    // Instructions: https://divjoy.com/docs/mixpanel
    mixpanelPlugin({
      token: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,
    }),
    googleTagManager({
      containerId: 'G-60TGLK5P76'
    }),
  ],
});

// Track initial pageview
if (typeof window !== "undefined") {
  analytics.page();
}

// Track pageview on route change
Router.events.on("routeChangeComplete", (url) => {
  analytics.page();
});

export default analytics;
