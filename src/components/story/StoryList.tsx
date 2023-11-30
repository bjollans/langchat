import Meta from "components/Meta";
import { useStories } from "util/db";

export default function StoryList() {
    const { data: stories } = useStories();

    return (
        <>
            <Meta />
            <div className="flex flex-col">
                <ul role="list" className="divide-y divide-gray-100">
                    {stories?.map((story: any) => (
                        <>
                            <a href={`/story/hi/${story.id}`} className="w-full h-full">
                                <li key={story.title} className="flex gap-x-4 py-5 hover:bg-slate-100 items-center">
                                    <img className="w-24 flex-none rounded-full bg-gray-50" src={story.imageUrl} alt="" />
                                    <div className="min-w-0">
                                        <p className="text-lg font-semibold leading-6 text-gray-900">{story.title}</p>
                                        <p className="mt-1 truncate italic text-xs leading-5 text-gray-400">{story.content.slice(0, 20) + '....'}</p>
                                    </div>
                                </li>
                            </a>
                        </>)
                    )}
                </ul>
            </div>
        </>
    );
}