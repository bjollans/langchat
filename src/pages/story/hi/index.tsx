import React from "react";
import Meta from "components/Meta";
import { useAuth, requireAuth } from "util/auth";
import StoryList from "components/story/StoryList";

function IndexPage() {
    return (
        <>
            <Meta title="Hindi Mini Stories" />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
                <div className="mx-auto max-w-3xl">
                    <StoryList />
                </div>
            </div>
        </>
    );
}

export default IndexPage;
