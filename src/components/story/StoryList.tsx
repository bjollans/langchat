import Meta from "components/Meta";
import { StoryText } from "model/translations";
import { useStoriesOrderedByCustom } from "util/db";
import StoryListElement from "./StoryListElement";
import posthog from "posthog-js";

export default function StoryList() {
    //AB TEST
    // *************
    //Start
    // *************
    const abTestOn = posthog.getFeatureFlag('content_postOverview_order') === 'test';
    const { data: stories } = useStoriesOrderedByCustom(abTestOn ? 'title' : 'wordCount', abTestOn ? false : true);
    // *************
    //End
    // *************

    return (
        <>
            <Meta />
            <div className="flex flex-col">
                <ul role="list" className="divide-y divide-gray-100">
                    {stories?.filter((story: StoryText) => story.visible).map((story: any) => <StoryListElement key={story.id} story={story} />)}
                </ul>
            </div>
        </>
    );
}