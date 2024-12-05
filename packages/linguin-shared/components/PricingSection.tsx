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

export default function PricingSection() {
    return (
        <div style={{ margin: '2rem auto', display: 'flex', alignItems: 'center', maxWidth: '24rem' }}>
            <div
                key={"subscriptionDetails"}
                style={{
                    position: 'relative',
                    backgroundColor: 'white',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    borderRadius: 24,
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    padding: 40
                }}
            >
                <p style={{ marginTop: 16, display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span style={{ fontSize: 48, fontWeight: 'bold', tracking: 'tight', color: 'rgb(17, 24, 39)' }}>{subscriptionDetails.priceMonthly}</span>
                    <span style={{ fontSize: 16, color: 'rgb(107, 114, 128)' }}>/month</span>
                </p>
                <p style={{ marginTop: 24, fontSize: 16, lineHeight: 28, color: 'rgb(75, 85, 99)' }}>
                    Get access to all stories and articles.
                </p>
                <p style={{ fontSize: 20, lineHeight: 28, color: 'rgb(75, 85, 99)' }}>
                    We add <b>new content every week</b>.
                </p>
                <ul role="list" style={{ marginTop: 40, display: 'block', gap: 12, fontSize: 14, lineHeight: 24, color: 'rgb(75, 85, 99)' }}>
                    {subscriptionDetails.features.map((feature) => (
                        <li key={feature} style={{ display: 'flex', gap: 12 }}>
                            <CheckIcon style={{ height: 24, width: 20, flex: 'none', color: 'rgb(2, 132, 199)' }} aria-hidden="true" />
                            {feature}
                        </li>
                    ))}
                </ul>
                <a
                    href={subscriptionDetails.href}
                    aria-describedby={"subscriptionDetails"}
                    onClick={() => posthog.capture('buy_click')}
                    style={{
                        backgroundColor: 'rgba(6, 182, 212, 0.9)',
                        color: 'white',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
                        display: 'block',
                        marginTop: 40,
                        borderRadius: 10,
                        padding: '0.625rem 1rem',
                        textAlign: 'center',
                        fontSize: 14,
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgb(2, 132, 199)'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(6, 182, 212, 0.9)'}
                >
                    Get Full Access (7 days free)
                </a>
                <p style={{ marginTop: 24, fontSize: 12, fontStyle: 'italic', lineHeight: 'tight', color: 'rgb(75, 85, 99)' }}>
                    You will only be charged after 7 days. Before then you can cancel your subscription at any time. After that you can cancel to the end of every month.
                </p>
            </div>
        </div>
    );
}