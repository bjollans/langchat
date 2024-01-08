import Meta from "components/Meta";
import StoryList, { StoryListProps } from "components/story/StoryList";
import { useRouter } from "next/router";
import posthog from "posthog-js";
import { useEffect } from "react";
import { getStoriesOrderedByCustom } from "util/db";

export async function getServerSideProps() {
    const stories = await getStoriesOrderedByCustom('title', false);
    return {
        props: {
            stories
        }
    };
}

function StoryIndexPage(props: StoryListProps) {
    const { query } = useRouter();
    const hasPaid = query.paid;

    useEffect(() => {
        if (hasPaid == 'true') {
          posthog.capture('purchase');
        }
      }, [query]);

    return (
        <>
            <Meta title="Hindi Mini Stories" />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
                <div className="mx-auto max-w-3xl">
                    {StoryList(props)}
                </div>
            </div>
        </>
    );
}

export default StoryIndexPage;
