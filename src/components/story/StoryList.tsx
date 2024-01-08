import Meta from "components/Meta";
import { StoryText } from "model/translations";
import StoryListElement from "./StoryListElement";

export interface StoryListProps {
    stories: StoryText[];
}

export default function StoryList(props: StoryListProps) {
    return (
        <>
            <Meta />
            <div className="flex flex-col">
                <ul role="list" className="divide-y divide-gray-100">
                    {props.stories?.filter((story: StoryText) => story.visible).map((story: any) => <StoryListElement key={story.id} story={story} />)}
                </ul>
            </div>
        </>
    );
}