import PricingSection from "components/PricingSection";
import posthog from "posthog-js";

export function SubscribeContentBlocker() {
    const lateMonetization = posthog.getFeatureFlag('monetization_after_2_stories') === 'test';
    const freeStoriesPerWeek = lateMonetization ? 5 : 3;
    return (
        <div className="flex justify-center absolute w-full z-10 h-full backdrop-blur-sm bg-white bg-opacity-60">
            <div className="rounded-lg p-4 mx-auto">
                <h3 className="text-black text-4xl max-w-lg tracking-tight text-center font-bold mb-4">
                    You have reached your free weekly limit of {freeStoriesPerWeek} stories
                </h3>
                <PricingSection />
            </div>
        </div>
    );
}