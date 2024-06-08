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
                    borderRadius: '1.5rem',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    padding: '2.5rem'
                }}
            >
                <p style={{ marginTop: '1rem', display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                    <span style={{ fontSize: '3rem', fontWeight: 'bold', tracking: 'tight', color: 'rgb(17, 24, 39)' }}>{subscriptionDetails.priceMonthly}</span>
                    <span style={{ fontSize: '1rem', color: 'rgb(107, 114, 128)' }}>/month</span>
                </p>
                <p style={{ marginTop: '1.5rem', fontSize: '1rem', lineHeight: '1.75rem', color: 'rgb(75, 85, 99)' }}>
                    Get access to all stories and articles.
                </p>
                <p style={{ fontSize: '1.125rem', lineHeight: '1.75rem', color: 'rgb(75, 85, 99)' }}>
                    We add <b>new content every week</b>.
                </p>
                <ul role="list" style={{ marginTop: '2.5rem', display: 'block', gap: '0.75rem', fontSize: '0.875rem', lineHeight: '1.5rem', color: 'rgb(75, 85, 99)' }}>
                    {subscriptionDetails.features.map((feature) => (
                        <li key={feature} style={{ display: 'flex', gap: '0.75rem' }}>
                            <CheckIcon style={{ height: '1.5rem', width: '1.25rem', flex: 'none', color: 'rgb(2, 132, 199)' }} aria-hidden="true" />
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
                        marginTop: '2.5rem',
                        borderRadius: '0.375rem',
                        padding: '0.625rem 1rem',
                        textAlign: 'center',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgb(2, 132, 199)'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(6, 182, 212, 0.9)'}
                >
                    Get Full Access (7 days free)
                </a>
                <p style={{ marginTop: '1.5rem', fontSize: '0.75rem', fontStyle: 'italic', lineHeight: 'tight', color: 'rgb(75, 85, 99)' }}>
                    You will only be charged after 7 days. Before then you can cancel your subscription at any time. After that you can cancel to the end of every month.
                </p>
            </div>
        </div>
    );
}