import Hero from "./Hero";
import ExampleStories from "./ExampleStories";
import Evidence from "./Evidence";
import Features from "./Features";
import Pricing from "./Pricing";
import { Metadata } from "next/types";

export const metadata: Metadata = {
    title: 'Linguin - Hindi Reading Practice',
    description: 'Improve your Hindi reading! Practice with Stories, Indian Myths and Informational Texts. Instant translations and pronounciation guides. All texts with audio narration. ',
}

export default function LandingPage() {
    return (
        <div>
        <Hero />
        <Evidence />
        <ExampleStories />
        <Features />
        <Pricing />
        </div>
    );
    }