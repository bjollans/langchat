import React, { useEffect } from "react";
import { useRouter } from "next/router";
import posthog from "posthog-js";
import Meta from "components/Meta";
import StoryList from "components/story/StoryList";

function IndexPage() {
  const { query } = useRouter();
  const hasPaid = query.paid;

  useEffect(() => {
    if (hasPaid == 'true') {
      posthog.capture('purchase');
    }
  }, [query]);

  return <>
    <Meta title="Hindi Mini Stories" alternated={{canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/story/hi`}} />
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
      <div className="mx-auto max-w-3xl">
        <StoryList />
      </div>
    </div>
  </>
}

export default IndexPage;
