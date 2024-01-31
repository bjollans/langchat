
import { BookOpenIcon, ChartBarIcon, QuestionMarkCircleIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline';

const features = [
    {
        name: 'Lots of Reading Choices',
        description:
            "Explore a big collection of interesting stories and articles. There's always something new to discover, keeping your reading fun.",
        icon: BookOpenIcon,
    },
    {
        name: 'Test Your Comprehension',
        description:
            'After reading each story, there is a quesiton to see how much you understood. This forces you to understand what is being said.',
        icon: QuestionMarkCircleIcon,
    },
    {
        name: 'Keep Track of Your Reading',
        description:
            "See your reading progress with simple stats. Track how much you've read and see your improvement over time.",
        icon: ChartBarIcon,
    },
    {
        name: 'Improve Your Listening',
        description:
            "Every story comes with an audio option, which is great for listening practice.",
        icon: SpeakerWaveIcon,
    },
]

export default function Features() {
    return (
        <div className="bg-white py-6 sm:py-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-blue-900">Become Fluent</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        All the Hindi Practice You Need
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        We have a wide range of stories and articles, that you can read or listen to, to practice your Hindi.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-900">
                                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </div>
                                    {feature.name}
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
}