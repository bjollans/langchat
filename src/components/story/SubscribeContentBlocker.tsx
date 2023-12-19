import PricingSection from "components/PricingSection";

export function SubscribeContentBlocker() {
    return (
        <div className="flex justify-center absolute w-full z-10 h-full backdrop-blur-sm">
            <div className="rounded-lg p-4 mx-auto">
                <h3 className="text-black text-4xl max-w-lg tracking-tight text-center font-bold mb-4">
                    You have reached your free weekly limit of 3 stories
                </h3>
                <p className="text-xl underline font-semibold mb-4 text-black text-center">
                    Get Premium 7 days free
                    </p>
                <PricingSection />
            </div>
        </div>
    );
}