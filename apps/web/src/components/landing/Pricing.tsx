import { CheckIcon } from "@heroicons/react/24/outline";
import { subscriptionDetails } from "components/PricingSection";
import posthog from "posthog-js";

const includedFeatures = [
    'Private forum access',
    'Member resources',
    'Entry to annual conference',
    'Official member t-shirt',
]

export default function Pricing() {
    const lateMonetization = posthog.getFeatureFlag('monetization_after_2_stories') === 'test';
    const freeStoriesPerWeek = lateMonetization ? 5 : 3;

    const topText = `${freeStoriesPerWeek} Free Stor${freeStoriesPerWeek > 1 ? "ies" : "y"} per Week`;
    const bottomText = `Then ${subscriptionDetails.priceMonthly} per month (7 day free trial).`

    return (
        <div className="bg-white">
          <div className="mx-auto max-w-3xl py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="relative isolate overflow-hidden bg-white px-6 py-24 text-center sm:rounded-3xl sm:px-16">
              <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-blue-900 sm:text-4xl">
                {topText}
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-900">
                {bottomText}
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="/story/hi"
                  className="rounded-md bg-blue-900 text-lg px-3.5 py-2.5 font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Start Reading
                </a>
              </div>
            </div>
          </div>
        </div>
      );
}