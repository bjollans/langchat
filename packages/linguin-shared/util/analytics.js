"use client";

import Analytics from "analytics";
import mixpanelPlugin from "@analytics/mixpanel";

// Initialize analytics and plugins
// Documentation: https://getanalytics.io
const analytics = Analytics({
  debug: process.env.NODE_ENV !== "production",
  plugins: [
  ],
});

// Track initial pageview
if (typeof window !== "undefined") {
  analytics.page();
}

export default analytics;
