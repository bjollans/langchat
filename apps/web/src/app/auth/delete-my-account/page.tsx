"use client";

import { useAuth } from "@linguin-shared/util/auth";
import { requireAuth } from "@linguin-shared/util/requireAuth";
import { apiRequest } from "@linguin-shared/util/util";
import { useState } from "react";

function DeleteMyAccountPage() {
    const auth = useAuth();
    const [response, setResponse] = useState<string | null>(null);
    const [responseType, setResponseType] = useState<"success" | "error">("success");

    const handleDelete = async () => {
        try {
            const resp = await apiRequest("delete-my-account", "POST", {
                uid: auth.user.id,
            });
            setResponse("Your account has been deleted.");
            setResponseType("success");
        }
        catch (error) {
            setResponse("Something went wrong. Please try again later.");
            setResponseType("error");
        }
    };

    return (
        <div className="p-2 text-center space-y-4">
            {response && <p className={`${responseType == "error" ? "bg-red-200" : "bg-green-200"} p-2 rounded-md shadow max-w-lg mx-auto`}>{response}</p>}
            <h1 className="font-bold text-2xl">Delete My Account</h1>
            <p className="font-bold text-xl">Are you sure you want to delete your account? </p>
            <p className="font-bold text-4xl">This cannot be undone.</p>
            <button className="rounded-md bg-red-500 red-500 text-white font-bold p-4" onClick={handleDelete}>!!! Delete !!!</button>
        </div>

    );
}

export default requireAuth(DeleteMyAccountPage);