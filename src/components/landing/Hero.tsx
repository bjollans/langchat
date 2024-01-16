export default function Hero() {
    return (
        <div className="h-fit">
            <div className="h-40 bg-gradient-to-r from-amber-400 to-amber-600" />
            <div className="mx-auto max-w-2xl py-10">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-blue-900">
                        Read Your Way to Hindi Fluency
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-900">
                        Practice Reading Hindi with our Hindi text passages.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a
                            href="/story/hi"
                            className="rounded-md bg-blue-900 px-3.5 py-2.5 text-lg font-semibold shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 text-white focus-visible:outline-offset-2 focus-visible:outline-amber-400"
                        >
                            Start Reading
                        </a>
                    </div>
                </div>
            </div>
            <div className="h-40 bg-gradient-to-r from-green-600 to-green-800" />
        </div>
    );
}