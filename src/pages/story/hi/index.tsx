import React from "react";
import Meta from "components/Meta";
import { useAuth, requireAuth } from "util/auth";
import StoryList from "components/story/StoryList";

function IndexPage() {
    return (
        <>
            <Meta />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
                <div className="mx-auto max-w-3xl">
                    <div className="min-w-0 flex-1">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                            🇮🇳 &nbsp; Hindi Mini Stories
                        </h2>
                    </div>
                    <StoryList />
                </div>
            </div>
        </>
    );
}

export default requireAuth(IndexPage);
