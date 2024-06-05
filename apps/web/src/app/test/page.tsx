"use client";

import { useAuth } from "@linguin-shared/util/auth";
import { requireAuth } from "@linguin-shared/util/requireAuth";
import { apiRequest } from "@linguin-shared/util/util";
import { useState } from "react";

function DeleteMyAccountPage() {
    const [response, setResponse] = useState<string | null>(null);
    const [responseType, setResponseType] = useState<"success" | "error">("success");

    const handleDelete = async () => {
        try {
            const resp = await apiRequest("update-user-word-stats", "POST", {
                wordsSeen: ["asdasd123"],
                storiesViewed: ["asdasd123"],
                language: "ja",
            });
            console.log(resp);
            setResponse("Success: " + JSON.stringify(resp));
            setResponseType("success");
        }
        catch (error) {
            setResponse("Something went wrong. Please try again later: " + error);
            setResponseType("error");
        }
    };

    return (
        <div className="p-2 text-center space-y-4">
            {response && <p className={`${responseType == "error" ? "bg-red-200" : "bg-green-200"} p-2 rounded-md shadow max-w-lg mx-auto`}>{response}</p>}
            <h1 className="font-bold text-2xl">Testing</h1>
            <p className="font-bold text-xl">asdasd</p>
            <p className="font-bold text-4xl">something something.</p>
            <button className="rounded-md bg-green-500 green-500 text-white font-bold p-4" onClick={handleDelete}>Test!</button>
        </div>

    );
}

export default requireAuth(DeleteMyAccountPage);