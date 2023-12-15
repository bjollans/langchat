import Meta from "components/Meta";
import { StoryText } from "model/translations";
import { useStories } from "util/db";
import StoryListElement from "./StoryListElement";

export default function StoryList() {
    const { data: stories } = useStories();

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