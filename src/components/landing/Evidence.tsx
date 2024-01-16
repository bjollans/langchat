export default function Evidence() {
    return (
        <section className="relative isolate overflow-hidden p-6 py-12 sm:py-12 lg:px-8 bg-white my-12 md:my-24">
            <div className="mx-auto quote max-w-2xl lg:max-w-4xl rounded-lg px-6 pb-6 shadow-sm bg-blue-900 text-blue-900 shadow-inner">
  
                <figure className="">
                        <svg className="w-11 h-10 bg-white border border-white p-2 shadow-inner mb-6 text-blue-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                        <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                    </svg>

                    <blockquote className="text-center text-xl font-semibold leading-8 sm:text-2xl sm:leading-9">
                        <p>
                            “Free voluntary reading may be the most powerful tool we have in language education. In fact, it appears to be too good to be true.”
                        </p>
                    </blockquote>
                    <figcaption className="mt-10">
                        <div className="mt-4 sm:flex items-center justify-start space-x-1 sm:space-x-2 text-base">
                            <a href="https://twitter.com/skrashen" className="font-semibold underline text-gray-900">Stephen Krashen</a>
                            <svg viewBox="0 0 2 2" width={3} height={3} aria-hidden="true" className="fill-blue-900 max-sm:hidden">
                                <circle cx={1} cy={1} r={1} />
                            </svg>
                            <span className="text-gray-700 italic">(Educational Researcher)</span>
                        </div>
                    </figcaption>
                </figure>
            </div>
        </section>
    );
}