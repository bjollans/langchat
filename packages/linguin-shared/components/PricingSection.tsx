import { CheckIcon } from "@heroicons/react/24/outline";
import posthog from "posthog-js";

export const subscriptionDetails =
{
    href: '/purchase/monthly',
    priceMonthly: '$5',
    description: "The perfect plan if you're just getting started with our product.",
    features: [
        'Unlimited Listening and Reading',
        'New Content Every Week',
        'Save & Practice Vocabulary',
    ]
};

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function PricingSection() {
    return (
        <div className="mx-auto mt-8 items-center max-w-sm">
            <div
                key={"subscriptionDetails"}
                className={classNames(
                    'relative bg-white shadow-2xl',
                    'rounded-3xl ring-1 ring-gray-900/10 p-10'
                )}
            >
                <p className="mt-4 flex items-baseline gap-x-2">
                    <span className="text-5xl font-bold tracking-tight text-gray-900">{subscriptionDetails.priceMonthly}</span>
                    <span className="text-base text-gray-500">/month</span>
                </p>
                <p className="mt-6 text-base leading-7 text-gray-600">
                    Get access to all stories and articles.
                </p>
                <p className="text-lg leading-7 text-gray-600">
                    We add <b>new content every week</b>.
                </p>
                <ul role="list" className="space-y-3 text-sm leading-6 text-gray-600 mt-10">
                    {subscriptionDetails.features.map((feature) => (
                        <li key={feature} className="flex gap-x-3">
                            <CheckIcon className="h-6 w-5 flex-none text-cyan-600" aria-hidden="true" />
                            {feature}
                        </li>
                    ))}
                </ul>
                <a
                    href={subscriptionDetails.href}
                    aria-describedby={"subscriptionDetails"}
                    onClick={() => posthog.capture('buy_click')
                    }
                    className={classNames(
                        'bg-cyan-600/90 text-white shadow hover:bg-cyan-500',
                        'mt-10 block rounded-md py-2.5 px-3.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600'
                    )}
                >
                    Get Full Access (7 days free)
                </a>
                <p className="mt-6 text-xs italic leading-tight text-gray-600">
                    You will only be charged after 7 days. Before then you can cancel your subscription at any time. After that you can cancel to the end of every month.
                </p>
            </div>
        </div>
    );
}