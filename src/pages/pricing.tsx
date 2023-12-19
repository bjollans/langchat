import { CheckIcon } from '@heroicons/react/20/solid'
import PricingSection from 'components/PricingSection';

const subscriptionDetails =
{
  href: '/purchase/monthly',
  priceMonthly: '€5',
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

export default function PricingPage() {
  return (
    <div className="relative isolate bg-white px-6 mt-12 lg:px-8">
      <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
        <p className="mt-2 font-bold tracking-tight text-gray-900 text-5xl">
          Get Access!
        </p>
      </div>
      <PricingSection />
    </div>
  )
}
