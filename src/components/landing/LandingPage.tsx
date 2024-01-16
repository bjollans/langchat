import Hero from "./Hero";
import ExampleStories from "./ExampleStories";
import Evidence from "./Evidence";
import Features from "./Features";
import Pricing from "./Pricing";
import PricingSection from "components/PricingSection";

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