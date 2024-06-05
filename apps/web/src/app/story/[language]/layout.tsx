import { Metadata } from "next/types";


export async function generateStaticParams() {
    return [
        { language: "hi" },
        { language: "ja" },
        { language: "zh" },
        { language: "de" },
        { language: "el" },
    ];
}

export default function Layout({ children }) {
    return (
        <>
            {children}
        </>
    )
}

export const metadata: Metadata = {
    title: 'Linguin - Hindi Reading Practice',
    description: 'Improve your Hindi reading! Practice with Stories, Indian Myths and Informational Texts. Instant translations and pronounciation guides. All texts with audio narration. ',
}
