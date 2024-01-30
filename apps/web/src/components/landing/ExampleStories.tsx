const posts = [
    {
        id: '2119621f-536c-4417-8684-592de874c1cc',
        title: 'The Jackal and the Drum',
        subtitle: 'Ancient Indian Fables'
    },
    {
        id: '2c85bbc2-da62-4d7b-8e5a-14d81a43e3f5',
        title: 'The Village Fair',
        subtitle: 'Easy Hindi Mini Stories'
    },
    {
        id: 'c78fab55-34fc-4553-a5a6-9fd445fc7a6e',
        title: 'The Gupta Empire',
        subtitle: "About India's Rich History"
    },
]

export default function ExampleStories() {
    return (
        <div className="bg-white py-4 sm:py-12 my-12 md:my-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Try Now for Free</h2>
                    <p className="mt-8 text-lg leading-8 text-gray-600">
                        Choose one of the options below to start. Our <a href="/story/hi" className="underline">Library</a> contains even more content to practice reading Hindi. We have mini stories, fables and informational texts.
                    </p>
                </div>
                <div className="my-12 mx-auto mt-4 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {posts.map((post) => {
                        const imageUrl = `https://backend.linguin.co/storage/v1/object/public/storyImages/${post.title}.gif`;
                        const href = `${process.env.NEXT_PUBLIC_SITE_URL}/story/hi/${post.id}`;
                        return (
                            <article
                                key={post.id}
                                className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-72"
                            >
                                <img src={imageUrl} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
                                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-gray-900/10" />
                                <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

                                <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                                    {post.subtitle}
                                </div>
                                <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                                    <a href={href}>
                                        <span className="absolute inset-0" />
                                        {post.title}
                                    </a>
                                </h3>
                            </article>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}