import React from "react";
import Meta from "components/Meta";
import SettingsSection from "components/SettingsSection";


export const generateStaticParams = () => ([
    { params: { section: "general" } },
    { params: { section: "password" } },
    { params: { section: "billing" } },
]);

function SettingsPage({ params }) {
    const { section } = params;

    return (
        <>
            <Meta title="Settings" noindex={true} />
            <SettingsSection
                size="md"
                bgColor="bg-white"
                bgImage=""
                bgImageOpacity={1}
                section={section}
                key={section}
            />
        </>
    );
}

export default SettingsPage;
