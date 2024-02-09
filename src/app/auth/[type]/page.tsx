import React from "react";
import Meta from "components/Meta";
import AuthSection from "components/auth/AuthSection";

export const generateStaticParams = () => ([
    { params: { type: "signin" } },
    { params: { type: "signup" } },
    { params: { type: "forgotpass" } },
    { params: { type: "changepass" } },
]);

function AuthPage({ params }) {
    const { type } = params;

    return (
        <>
            <Meta noindex={true} />
            <AuthSection
                size="md"
                bgColor="bg-white"
                bgImage=""
                bgImageOpacity={1}
                textColor=""
                type={type}
                providers={["google"]}
            />
        </>
    );
}

export default AuthPage;
